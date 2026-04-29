"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "./loginService";

export function useLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await loginService({
        email,
        password,
      });

      await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: result.access_token,
        }),
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return {
    email,
    password,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    goToRegister,
  };
}