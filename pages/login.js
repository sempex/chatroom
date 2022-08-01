import {signIn, getProviders } from "next-auth/react"

export default function Login({ providers }) {

    return (
        <div className="flex items-center justify-center h-screen gap-20">
            <img src="/assets/background.svg" alt="Background Image" className="absolute inset-0 h-screen w-screen z-[-1]" />
            <h1 className="text-5xl mb-5 font-extrabold">Login</h1>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button type={provider.id === "creds" ? "submit" : "button"} className="bg-blue-500 text-white shadow-blue-500/60" onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
        </div>
    )
}
export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}