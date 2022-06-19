import { useRouter } from "next/router"
import { useEffect } from "react"
import io from 'socket.io-client'
let socket


export default function Home() {

    const router = useRouter()
    const id = router.query.roomid
    useEffect(() => {
        const socketInitializer = async () => {
            await fetch('/api/socket')
            socket = io()
            socket.on('welcome', msg => {
                console.log(msg)
            })
        }
        if (!socket) socketInitializer()
        else socket.emit('join', id)
        return () => { }
    }, [router])


    return (
        <div>
            <p>{id}</p>
        </div>
    )
}

