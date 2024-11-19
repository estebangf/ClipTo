import AnimatedIn from "@/components/AnimatedIn";
import HomeFeature from "@/components/HomePage/HomeFeature";
import HomeHeader from "@/components/HomePage/HomeHeader";
import HomeUrlShortener from "@/components/HomePage/HomeUrlShortener";
import UpcomingFeatures from "@/components/HomePage/UpcomingFeatures";
import Link from "next/link";
// import { useState } from "react";


export default function Home () {
  // const [inputUrl, setInputUrl] = useState("");
  // const [shortUrl, setShortUrl] = useState("");


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="space-y-10">
        {/* Encabezado */}
        <HomeHeader />
        {/* Acortador */}
        <HomeUrlShortener />

        {/* Características */}
        <section className="max-w-5xl mx-auto">
          <AnimatedIn>
            <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">¿Por qué elegir ClipTo?</h2>
          </AnimatedIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HomeFeature title="Enlaces cortos y personalizados" description="Personaliza tus enlaces para que sean fáciles de recordar y compartir." />
            <HomeFeature className="delay-150" title="Estadísticas detalladas" description="Monitorea los clics, dispositivos y ubicaciones de tus enlaces con un dashboard intuitivo." />
            <HomeFeature className="delay-300" title="Fácil integración" description="Usa ClipTo en tus proyectos y aplicaciones con nuestra API REST." />
          </div>
        </section>

        <section className="max-w-5xl mx-auto">
          <UpcomingFeatures />
        </section>

        {/* Llamada a la acción */}
        <AnimatedIn className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-green-500 to-green-400 py-8 rounded-lg shadow-md text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">¡Empieza a usar ClipTo hoy!</h2>
          <p className="text-white mb-6">
            Únete a miles de usuarios que ya están compartiendo sus enlaces de una manera más práctica y profesional.
          </p>
          <Link href="/login" className="bg-white text-green-600 px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-100 transition">
            Regístrate gratis
          </Link>
        </AnimatedIn>

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
    </div>
  );
}
