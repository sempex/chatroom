export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-4xl mb-28">Welcome to <span className="font-extrabold text-teal-300">SimpleChat!</span></h1>
      <form>
        <div className="">
          <input type="text" placeholder="Enter Room ID" className="p-6 bg-slate-200 rounded-xl text-center shadow-md shadow-slate-500/50"></input>
        </div>
        <div className="text-center mt-2">
          <input type="submit" value="Continue" className="py-4 px-7 bg-teal-300 rounded-xl font-extrabold shadow-md shadow-teal-300/60"></input>
        </div>
      </form>
    </div>
  )
}
