'use client'
import { useActionState } from "react";
import AnimatedIn from "../AnimatedIn";
import { createTemporalyShorten } from "@/lib/ShortsActions";
import Link from "next/link";
import isValidHttpUrl from "@/lib/isValidHttpUrl";

export default function HomeUrlShortener () {
  const [{ message }, formAction] = useActionState(createTemporalyShorten, { message: null })

  const success = isValidHttpUrl(message)

  return (
    <AnimatedIn className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10 text-center">
      <form action={formAction}>
        <h2 className="text-2xl font-semibold text-gray-700 mb-0">Prueba nuestro acortador</h2>
        <p className="text-xs text-gray-500 mb-4 px-8 no-underline">Ten en cuenta que los link generados desde este formulario solo podrán ser utilizados 2 veces antes de dejar de funcionar</p>
        <div className="flex items-center space-x-2">
          <input
            id="url"
            name="url"
            type="url"
            placeholder="Pega tu enlace largo aquí"
            // value={inputUrl}
            // onChange={(e) => setInputUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-400 focus:ring focus:ring-green-100 shadow-sm"
          />
          <button
            // onClick={handleShorten}
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Acortar
          </button>
        </div>
        {message && (
          <p className="mt-4">
            {success ? (
              <Link target="_blank" href={message} className="text-green-600 underlinen">
                {message}
              </Link>
            ) : (
              <span className="text-red-600">{message}</span>
            )}
          </p>
        )}
      </form>
    </AnimatedIn>
  );
}
