import { signIn } from "@/auth"

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
        <button type="submit"
          className="px-4 py-2 text-white bg-red-500 rounded"
        // onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Iniciar Sesión con Google
        </button>
      </form>
    </div>
  );
}
