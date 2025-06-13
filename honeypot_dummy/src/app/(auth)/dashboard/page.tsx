'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyUserJWT } from "@/lib/verifyUser";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const token = session?.accessToken;
    const role = session?.user?.role;

    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (token && role !== "ADMIN") {
      router.push("/unauthorized");
      return;
    }

    const runVerification = async () => {
      try {
        const data = await verifyUserJWT(token!);
        console.log("Backend response:", data);
      } catch (err) {
        console.error("Error verifying user (JWT):", err);
      }
    };

    if (token) runVerification();
  }, [session?.accessToken, session?.user?.role, status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="text-black">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session?.user?.email}</p>
      <p>Your role: {session?.user?.role}</p>
    </div>
  );
};

export default DashboardPage;
