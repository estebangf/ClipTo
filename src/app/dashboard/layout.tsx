// 'use client'
import { auth } from "@/auth";
import UserBar from "@/components/UserBar";
// import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  if (!session) return (
    <>
      <UserBar />
      <div>
        NO AUTORIZADO
      </div>
    </>
  )

  return (
    <>
      {/* <SessionProvider> */}
      <UserBar />
      {children}
      {/* </SessionProvider> */}
    </>
  );
}
