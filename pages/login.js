import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSession, signIn, SignOut, getProviders } from "next-auth/react"

const scheme = yup.object({
    email: yup.string().email(),
    username: yup.string().min(3).max(15),
    password: yup.string().min(7).max(30)
})
export default function Login({ providers }) {
    const { data: session } = useSession()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(scheme)
    })

    const onSubmit = (data, e) => {
        e.preventDefault()
        const email = data.email
        const username = data.username
        const password = data.password
        signIn("creds", {
            username: username,
            password: password
        })
    }
    return (
        <div className="flex items-center justify-center h-screen gap-20">
            <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-screen w-screen z-[-1]" />
            <h1 className="text-5xl mb-5 font-extrabold">Login</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Username" {...register("username", { required: true })} />
                <input placeholder="Email" {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
                <input placeholder="Password" type={"password"} {...register("password", { required: true })} />
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button type={provider.id === "creds" ? "submit" : "button"} className="bg-blue-500 text-white shadow-blue-500/60" onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </form>
        </div>
    )
}
export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}