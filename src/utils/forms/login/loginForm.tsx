'use client'
import Link from "next/link";
import useLoginFormController from "./controller/loginFormController";
import LoadingButtons from "@/components/LoadingButtons";

export default function LoginForm() {
    const { user, updateUser, loading, formValid, onLogin } = useLoginFormController();

    return (
        <div className="flex flex-col gap-y-1 items-center justify-center mt-8">
            <div className="flex flex-col gap-y-2 h-fit w-96">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="email">Email</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => updateUser('email', e.target.value)}
                        placeholder="Email"
                    />
                </div>
                
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="password">Senha</label>
                    <input
                        className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => updateUser('password', e.target.value)}
                        placeholder="Password"
                    />
                </div>
            </div>

            <button
                onClick={onLogin}
                disabled={!formValid || loading}
                className={`my-3 w-80 h-10 p-2 border bg-cor4 border-gray-300 hover:bg-green-600 text-white rounded-lg focus:outline-none focus:border-gray-600 ${(!formValid || loading) ? "cursor-not-allowed opacity-50" : ""}`}
                >
                {loading ? <LoadingButtons /> : "Login"}
            </button>
            <Link 
            href="/register"
            className="text-center text-sm text-cor2 dark:text-blue-500 hover:underline"
            >Página de cadastro</Link>
        </div>
    );
}
