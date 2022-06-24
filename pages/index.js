import { useState } from "react"
import { useTypewriter } from "react-simple-typewriter"
import { useRouter } from "next/router"
import axios from "axios"
import Link from 'next/link'

export default function Home() {
  const { text, count } = useTypewriter({
    words: ['Connect with new people!', 'Meet friends!', 'Just chat!', 'Get work done!'],
    loop: false
  })



  const [room, setRoom] = useState('')

  const router = useRouter()

  const onChangeHandler = (e) => {
    setRoom(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    router.push(`/chat/${room}`)
  }





  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-screen w-screen z-[-1]" />
      <h1 className="font-bold text-4xl mb-5">Welcome to <span className="font-extrabold text-teal-300">SimpleChat!</span></h1>
      <p className="mb-16 font-bold text-xl">With SimpleChat you can <span className="font-extrabold text-gray-600 text-2xl">{text}</span></p>
      <form onSubmit={onSubmit} className="">
        <div className="">
          <input type="text" placeholder="Enter Room ID" value={room} onChange={onChangeHandler} className="p-6 bg-slate-200 rounded-xl text-center shadow-md shadow-slate-500/50"></input>
        </div>
        <div className="text-center mt-2">
          <button type="submit" className="bg-teal-300 shadow-teal-300/60">Continue</button>
        </div>
      </form>

      <Link href="/login"><a className="py-2 px-4 font-extrabold cursor-pointer hover:text-gray-500 transition-all">Login</a></Link>
    </div>
  )
}
