import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Login from "../components/Login"
import Landing from "../components/Landing"


export default function Home() {
  const { data: session, status } = useSession()
  const [ login, setLogin ] = useState(true)


  useEffect(() => {
    const checkAuthenticated = async () => {
      if (status === "authenticated") {
        await setLogin(false)
      }
    }
    checkAuthenticated()
  })
  



  return (

    <div>
      {
        login ? <Login /> : <Landing />
      }
    </div>
  )
}
