'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home () {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!inputUrl) return;
    // Aquí iría la llamada a la API para acortar la URL.
    // Simularemos una URL acortada temporalmente.
    setShortUrl(`https://clipto.io/${Math.random().toString(36).substring(2, 8)}`);
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Encabezado */}
      <header className="max-w-5xl mx-auto flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600">
          Bienvenido a ClipTo
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Acorta, comparte y gestiona tus enlaces de manera eficiente
        </p>
        <Image src="/logo.png" alt="Logo de ClipTo" width={150} height={150} className="mt-4" />
      </header>

      {/* Sección de Acortador */}
      <section className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Prueba nuestro acortador</h2>
        <div className="flex items-center space-x-2">
          <input
            type="url"
            placeholder="Pega tu enlace largo aquí"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-100 transition shadow-sm"
          />
          <button
            onClick={handleShorten}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Acortar
          </button>
        </div>
        {shortUrl && (
          <p className="mt-4 text-green-600">
            ¡Tu enlace corto es:{" "}
            <a href={shortUrl} className="text-blue-600 underline">
              {shortUrl}
            </a>
            !
          </p>
        )}
      </section>

      {/* Características */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">¿Por qué elegir ClipTo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600">Enlaces cortos y personalizados</h3>
            <p className="mt-2 text-gray-600">
              Personaliza tus enlaces para que sean fáciles de recordar y compartir.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600">Estadísticas detalladas</h3>
            <p className="mt-2 text-gray-600">
              Monitorea los clics, dispositivos y ubicaciones de tus enlaces con un dashboard intuitivo.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600">Fácil integración</h3>
            <p className="mt-2 text-gray-600">
              Usa ClipTo en tus proyectos y aplicaciones con nuestra API REST.
            </p>
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className="max-w-5xl mx-auto mt-12 bg-white py-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
          ¡Empieza a usar ClipTo hoy!
        </h2>
        <p className="text-gray-600 mb-6">
          Únete a miles de usuarios que ya están compartiendo sus enlaces de una manera más práctica y profesional.
        </p>
        <Link href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
          Regístrate gratis
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500">
        <p>© 2024 ClipTo - Todos los derechos reservados</p>
        <nav className="flex justify-center space-x-4 mt-2">
          <Link href="/terms" className="hover:underline">
            Términos de servicio
          </Link>
          <Link href="/privacy" className="hover:underline">
            Política de privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
