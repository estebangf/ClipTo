import { auth, signIn, signOut } from "@/auth";
import Button from "./Button";

export default async function UserBar () {
  const session = await auth()

  if (!session) return (
    <div className="flex items-center p-4 bg-gray-100 shadow-md">

      <form
        className="ml-auto"
        action={async () => {
          "use server"
          await signIn('google')
        }}
      >
        <Button
          type='submit'
          className="text-red-500 hover:underline"
        >
          Iniciar Sesion
        </Button>
      </form>
    </div>
  );

  const user = session.user;

  return (
    <div className="flex items-center p-4 bg-white shadow-md">
      {/* Foto del usuario */}
      {user?.image && (
        <img
          src={user.image}
          alt="User Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}

      {/* Nombre y correo del usuario */}
      <div>
        <p className="text-gray-700 font-semibold">{user?.name}</p>
        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      {/* Botón de cerrar sesión */}
      <form
        className="ml-auto"
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button
          type='submit'
          className="text-red-500 hover:underline"
        >
          Cerrar sesión
        </Button>
      </form>
    </div>
  );
}
