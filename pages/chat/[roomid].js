import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
import Message from "../../components/Message"
let socket


export default function Home() {

    const [message, setMessage] = useState('')
    const [incomingMessages, setIncomingMessages] = useState([])
    const refLatestChat = useRef(null)
    const router = useRouter()
    const id = router.query.roomid
    useEffect(() => {
        let ignore = false
        const socketInitializer = async () => {
            await fetch('/api/socket')
            socket = io()
            socket.on('welcome', msg => {
                console.log(msg)
            })
            socket.on('serverMessage', message => {
                setIncomingMessages(current => [...current, message])
                refLatestChat.current.scrollIntoView({
                    behavior: "smooth"
                })
            })
            if (!ignore) socket.emit('join', id)
        }
        socketInitializer()
        return () => { ignore = true }
    }, [router])


    const onChangeHandler = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('message', message)
        setMessage('')
    }
    console.log(incomingMessages)

    return (
        <div className="relative h-screen flex flex-col">
            <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-full w-full z-[-1]" />
            <div className="overflow-y-auto h-full">
                {
                    incomingMessages.map((message, i) => {
                        return <Message messagetext={message} key={i} />
                    })
                }
                <div ref={refLatestChat} className="mb-20"></div>

            </div>
            <form className="flex justify-center" onSubmit={sendMessage}>
                <div className="space-x-6 mb-10">
                    <input className="px-7 py-2 bg-slate-200 rounded-xl shadow-md shadow-slate-500/50" onChange={onChangeHandler} value={message} />
                    <input type={"submit"} value="Send" className="py-2 px-7 bg-teal-300 rounded-xl font-extrabold shadow-md shadow-teal-300/60" />
                </div>
            </form>
        </div>
    )
}

