import { signIn } from "@/auth"
import Button from "@/components/Button";
import Image from "next/image";

// import { signIn } from "next-auth/react";

export default function LoginPage () {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="mb-6 text-xl font-semibold">Iniciar sesión en ClipTo</h2>
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <Button type="submit"
          className="px-6 py-3 rounded-lg border shadow-md bg-white border-gray-300 flex items-center font-sans text-gray-400 hover:shadow-lg transition-all duration-300 active:bg-gray-100"
        // onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <Image src="/google.png" alt="Googlge icon" width={20} height={20} className="mr-2" />
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
