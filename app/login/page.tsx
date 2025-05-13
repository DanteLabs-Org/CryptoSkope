"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526]">
      <div className="w-full max-w-md p-10 space-y-8 bg-card rounded-2xl shadow-2xl border border-border/40 backdrop-blur-md">
        <div className="text-center">
          <img src="/logo.png" alt="CryptoSkope Logo" className="mx-auto mb-4 w-16 h-16 rounded-full shadow-lg" />
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">Welcome to CryptoSkope</h1>
          <p className="mt-2 text-lg text-muted-foreground">Sign in to access your account</p>
        </div>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-6 text-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 shadow-md"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle className="w-7 h-7" />
            <span className="text-base md:text-lg">Sign in with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 