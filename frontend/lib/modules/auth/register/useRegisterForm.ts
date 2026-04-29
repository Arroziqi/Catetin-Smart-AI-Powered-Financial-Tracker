// hooks/useRegisterForm.ts
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerService } from "./registerService";

export function useRegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerService({
        email,
        password,
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Register gagal");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return {
    email,
    password,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    goToLogin,
  };
}