import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const scheme = yup.object({
    email: yup.string().email(),
    username: yup.string().min(3).max(15),
    password: yup.string().min(7).max(30)
})

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(scheme)
    })

    const onSubmit = data => {
        console.log(data.username)
    }
    return (
        <div>
            <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-screen w-screen z-[-1]" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Username" {...register("username", { required: true })} />
                <input placeholder="Email" {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
                <input placeholder="Password" type={"password"} {...register("password", { required: true })} />
                <input type={"submit"} />
            </form>
        </div>
    )
}