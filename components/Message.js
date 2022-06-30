import { useSession } from "next-auth/react"
export default function Message({ messagetext, messageUsername, messageProfilepicture }) {
    const { data: session, status } = useSession()
    
    const selfMessage = session?.user.name === messageUsername
    
    return (
        <div className={`${selfMessage ? 'ml-auto rounded-tl-xl' : "rounded-tr-xl"} rounded-b-xl bg-slate-100 w-fit max-w-[25%] m-4 px-5 py-2`}>
            <p className="font-bold text-xs">{messageUsername}</p>
            {/* <img src={messageProfilepicture} /> */}
            <p className="font-medium text-sm break-all">{messagetext}</p>
        </div>
    )
}