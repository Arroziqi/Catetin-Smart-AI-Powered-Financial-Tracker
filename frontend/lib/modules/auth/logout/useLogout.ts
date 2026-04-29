"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutService } from "./logoutService";

export function useLogout() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      await logoutService();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Logout gagal");
    } finally {
      setLoading(false);
    }
  };

  return {
    logout,
    loading,
  };
}