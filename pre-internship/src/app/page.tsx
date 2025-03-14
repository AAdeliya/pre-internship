"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  console.log("SignInPage render - isSignedIn:", isSignedIn);

  useEffect(() => {
    console.log("useEffect triggered - isSignedIn:", isSignedIn);
    if (isSignedIn) {
      console.log("User is signed in. Redirecting to /dashboard.");
      router.push("/dashboard");
    }
  }, [isSignedIn, router]); // Include router in dependencies

  return <SignIn />;
}
