"use client"

import { useState } from "react"
import { LoginDto, login } from "../services/authService";
import { setAuthToken } from "../api/api";


const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data = await login({ password, username } as LoginDto)
            setAuthToken(data.access_token)
        } catch (error) {
            console.log("Erro Login:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button className="px-4 py-2 font-semibold text-sm bg-green-500 text-white rounded-lg shadow-sm" type="submit">Login</button>
        </form>
    )
}

export default Login