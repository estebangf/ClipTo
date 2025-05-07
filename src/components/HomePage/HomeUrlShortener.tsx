'use client'
import { useActionState } from "react";
import AnimatedIn from "../AnimatedIn";
import { createTemporalyShorten } from "@/lib/ShortsActions";
import Link from "next/link";
import isValidHttpUrl from "@/lib/isValidHttpUrl";

export default function HomeUrlShortener() {
  const [{ message }, formAction, isPending] = useActionState(createTemporalyShorten, { message: null })

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
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-400 focus:ring focus:ring-green-100 shadow-sm text-gray-800"
          />
          <button
            // onClick={handleShorten}
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? <>
              <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Acortando...
            </> :
              "Acortar"
            }
          </button>
        </div>
        {message ? (
          <p className="mt-4">
            {success ? (
              <Link target="_blank" href={message} className="text-green-600 underlinen">
                {message}
              </Link>
            ) : (
              <span className="text-red-600">{message}</span>
            )}
          </p>
        ) : isPending && <p className="text-gray-600 pt-4">Generando enlace corto... <span className="animate-spin">x</span></p>}
      </form>
    </AnimatedIn>
  );
}
