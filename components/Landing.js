import { useState } from "react"
import { useTypewriter } from "react-simple-typewriter"
import { useRouter } from "next/router"
import { useDebouncedCallback } from 'use-debounce'
import axios from "axios"
export default function Landing() {
  const { text, count } = useTypewriter({
    words: ['Connect with new people!', 'Meet friends!', 'Just chat!', 'Get work done!'],
    loop: false
  })
  const [room, setRoom] = useState('')
  const [search, setSearch] = useState('')
  const [hits, setHits] = useState([])

  const router = useRouter()

  const onChangeHandler = (e) => {
    setRoom(e.target.value)
  }

  const debounced = useDebouncedCallback(
    async (value) => {
      const { data } = await axios.get(`/api/search?s=${value}`)
      setHits(data)
    },
    200
  );



  const onSubmit = async (e) => {
    e.preventDefault()
    router.push(`/chat/${room}`)
  }

  return (
    <div className="h-screen">
      <img src="/assets/background.svg" alt="Background Image" className="absolute h-screen w-screen z-[-1]" />
      <div className="flex justify-end">
        <div className="flex flex-col items-center">
          <input placeholder="Search friends..." className="mt-6 mr-4" onChange={(e) => debounced(e.target.value)}></input>
          {hits.map((hit, i) => {
            return <h1 key={i}>{hit.name}</h1>
          })}
        </div>
      </div>
      <div className="h-screen w-screen fixed flex flex-col items-center justify-center inset-y-16">
        <h1 className="font-bold text-4xl mb-5 text-center mt-2">Welcome to <span className="font-extrabold text-teal-300">SimpleChat!</span></h1>
        <p className="mb-16 font-bold text-xl text-center mt-2">With SimpleChat you can <span className="font-extrabold text-gray-600 text-2xl">{text}</span></p>
        <form onSubmit={onSubmit} className="">
          <div className="text-center mt-2">
            <input type="text" placeholder="Enter Room ID" value={room} onChange={onChangeHandler} className="p-6 bg-slate-200 rounded-xl text-center shadow-md shadow-slate-500/50"></input>
          </div>
          <div className="text-center mt-2">
            <button type="submit" className="bg-teal-300 shadow-teal-300/60">Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}