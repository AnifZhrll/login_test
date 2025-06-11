"use client";

import { loginAction } from "@/app/actions/loginAction";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const user = await loginAction();
      console.log("User logged in:", user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <button onClick={handleLogin}>Log In</button>;
}