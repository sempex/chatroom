import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import io from 'socket.io-client'
import Message from "../../components/Message"
import axios from "axios"
let socket
export default function Home() {
    const { data: session, status } = useSession()
    const [message, setMessage] = useState('')
    // const [incomingMessages, setIncomingMessages] = useState([])
    // const [mySentMessages, setmySentMessages] = useState([])
    const refLatestChat = useRef(null)
    const router = useRouter()
    const id = router.query.roomid
    const [roomMessages, setRoomMessages] = useState([])
    useEffect(() => {
        refLatestChat.current.scrollIntoView({
            behavior: "smooth"
        })
    }, [roomMessages])

    useEffect(() => {
        let ignore = false
        const socketInitializer = async () => {
            await fetch('/api/socket')
            socket = io()
            socket.on('serverMessage', message => {
                setRoomMessages(current => [...current, {
                    username: message.username,
                    message: message.message,
                    room: message.id
                }])
            })
            if (!ignore) {
                socket.emit('join', id)
                const { data } = await axios.get(`/api/message/${id}`)
                setRoomMessages(data)
            }
        }
        socketInitializer()
        return () => { ignore = true }
    }, [router])
    const onChangeHandler = (e) => {
        setMessage(e.target.value)
    }
    const sendMessage = async (e) => {
        e.preventDefault()
        socket.emit('message', {
            username: session?.user.name,
            message: message,
            room: id
        })
        setRoomMessages(current => [...current, {
            username: session?.user.name,
            message: message,
            room: id
        }])

        const res = await axios.post('/api/message/message', {
            username: session?.user.name,
            message: message,
            room: id,
            image: session?.user.image
        })
        setMessage('')
    }
    return (
        <div className="relative h-screen flex flex-col">
            <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-full w-full z-[-1]" />
            <div className="overflow-y-auto h-full">
                {
                    roomMessages.map((message, i) => {
                        return <Message messagetext={message.message} messageUsername={message.username} messageProfilepicture={message.image} key={i} />
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