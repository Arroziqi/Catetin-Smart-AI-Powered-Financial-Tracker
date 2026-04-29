// app/register/page.tsx
"use client";

import { motion } from "motion/react";
import { Wallet, Sparkles } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { useLoginForm } from "./useLoginForm";

export default function LoginPage() {
  const {
    email,
    password,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    goToRegister,
  } = useLoginForm();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-linear-to-br from-emerald-50 via-teal-50 to-green-50">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full md:min-w-sm max-w-md mx-auto shadow-xl border-0">
          <CardHeader className="space-y-3 text-center pb-8">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <Wallet className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl font-semibold tracking-tight">
              Catetin
            </CardTitle>

            <CardDescription className="text-base">
              Smart expense tracking with AI-powered insights
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl mt-6 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={goToRegister}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Don't have an account?
                <span className="text-primary font-medium ml-1">Register</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}