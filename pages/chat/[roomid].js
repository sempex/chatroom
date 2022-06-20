import { useRouter } from "next/router"
import { useEffect } from "react"
import io from 'socket.io-client'
let socket


export default function Home() {

    const router = useRouter()
    const id = router.query.roomid
    useEffect(() => {
        let ignore = false
        const socketInitializer = async () => {
            await fetch('/api/socket')
            socket = io()
            socket.on('welcome', msg => {
                console.log(msg)
                console.log(ignore)
            })
            if (!ignore) socket.emit('join', id)
        }
        socketInitializer()
        return () => { ignore = true }
    }, [router])


    return (
        <div>
            <p>{id}</p>
        </div>
    )
}

