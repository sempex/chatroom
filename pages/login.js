import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"

const scheme = yup.object({
    email: yup.string().email(),
    username: yup.string().min(3).max(15),
    password: yup.string().min(7).max(30)
})

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(scheme)
    })

    const onSubmit = async data => {
        const res = await axios.post('/api/users', {
            username: data.username,
            email: data.email,
            password: data.password
        })
    }
    return (
        <div className="flex items-center justify-center h-screen gap-20">
            <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-screen w-screen z-[-1]" />
            <h1 className="text-5xl mb-5 font-extrabold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input placeholder="Username" {...register("username", { required: true })} />
                <input placeholder="Email" {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
                <input placeholder="Password" type={"password"} {...register("password", { required: true })} />
                <button type={"submit"} className="shadow-teal-300/60 bg-teal-300">Login</button>
            </form>
        </div>
    )
}