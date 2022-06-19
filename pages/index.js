import { useEffect, useState } from "react"
import { useTypewriter } from "react-simple-typewriter"
import io from 'socket.io-client'
let socket


export default function Home() {
  const { text, count } = useTypewriter({
    words: ['Connect with new people!', 'Meet friends!', 'Just chat!', 'Get work done!'],
    loop: false
  })



  const [input, setInput] = useState('')



  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket')
      socket = io()
      socket.on('connect', () => {
        console.log('connected')
      }
      )
      socket.on('update-input', msg => {
        setInput(msg)
      })
      
    }
      socketInitializer()
  }, [])

    
  


  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    socket.emit('test', input)
  }





  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-screen w-screen z-[-1]" />
      <h1 className="font-bold text-4xl mb-5">Welcome to <span className="font-extrabold text-teal-300">SimpleChat!</span></h1>
      <p className="mb-28 font-bold text-xl">With SimpleChat you can <span className="font-extrabold text-gray-600 text-2xl">{text}</span></p>
      <form onSubmit={onSubmit}>
        <div className="">
          <input type="text" placeholder="Enter Room ID" value={input} onChange={onChangeHandler} className="p-6 bg-slate-200 rounded-xl text-center shadow-md shadow-slate-500/50"></input>
        </div>
        <div className="text-center mt-2">
          <input type="submit" value="Continue" className="py-4 px-7 bg-teal-300 rounded-xl font-extrabold shadow-md shadow-teal-300/60"></input>
        </div>
      </form>
    </div>
  )
}
