'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { verifyUserJWT } from "@/lib/verifyUser";

const HomePage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const token = session?.accessToken;
    if (!token) return;

    const runVerification = async () => {
      try {
        const data = await verifyUserJWT(token);
        console.log("Backend response:", data);
      } catch (err) {
        console.error("Error verifying user (JWT):", err);
      }
    };

    runVerification();
  }, [session?.accessToken]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Not authenticated</div>;

  return (
    <div className="text-black">
      <h1>Welcome to Home!</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Access Token (JWT): {session?.accessToken}</p>
    </div>
  );
};

export default HomePage;
