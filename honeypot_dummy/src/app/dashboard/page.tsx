import { getServerSession } from "next-auth/next";
   import { authOptions } from "../api/auth/[...nextauth]/route";
   import { redirect } from "next/navigation";

   export default async function DashboardPage() {
     const session = await getServerSession(authOptions);

     if (!session) {
       redirect("/auth/signin");
     }

     return (
       <div>
         <h1>Welcome, {session.user?.name}</h1>
       </div>
     );
   }