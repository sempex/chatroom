import { useSession } from "next-auth/react"
export default function Message({ messagetext, messageUsername, messageProfilepicture }) {
    const { data: session, status } = useSession()

    const selfMessage = session?.user.name === messageUsername

    return (
        <div className={`${selfMessage ? 'ml-auto' : ""} max-w-[25%] w-fit m-4 flex flex-col gap-2`}>
            <div className={`${selfMessage ? 'justify-start flex-row-reverse' : ''} flex items-center gap-2`}>
                <img src={messageProfilepicture} className="rounded-full w-7" />
                <p className="font-bold text-xs">{messageUsername}</p>
            </div>
            <div className={`${selfMessage ? 'rounded-tl-xl' : "rounded-tr-xl"} rounded-b-xl bg-slate-100 w-fit py-2 px-5`}>
                <p className="font-medium text-sm break-all">{messagetext}</p>
            </div>
        </div>
    )
}