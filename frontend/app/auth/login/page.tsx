"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-4">
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
