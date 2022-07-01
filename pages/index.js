import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Landing from "../components/Landing"
import { Router, useRouter } from "next/router"
export default function Home() {
  const { data: session, status } = useSession()
  const [login, setLogin] = useState(true)
  const router = useRouter()

  if (status !== "loading" && status !== "authenticated") router.push('/login')
    return (
      <Landing />
    )
}