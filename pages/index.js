export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form>
        <div className="">
          <input type="text" placeholder="Enter Room ID" className="p-6 bg-slate-200 rounded-xl text-center"></input>
        </div>
        <div className="text-center mt-2">
          <input type="submit" value="Continue" className="py-4 px-7 bg-teal-300 rounded-xl font-extrabold"></input>
        </div>
      </form>
    </div>
  )
}
