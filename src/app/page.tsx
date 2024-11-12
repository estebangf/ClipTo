// 'use client';
// import AnimatedIn from "@/components/AnimatedIn";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// // Componentes separados para secciones individuales
// function Header () {
//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-center p-10 rounded-lg text-white shadow-lg">
//       <h1 className="text-4xl md:text-6xl font-bold">Bienvenido a ClipTo</h1>
//       <p className="mt-4 text-lg md:text-xl">Acorta, comparte y gestiona tus enlaces de manera eficiente</p>
//       <Image src="/logo.png" alt="Logo de ClipTo" width={120} height={120} className="mt-4 mx-auto" />
//     </header>
//   );
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function UrlShortener ({ inputUrl, setInputUrl, handleShorten, shortUrl }: any) {
//   return (
//     <AnimatedIn className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10 text-center">
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Prueba nuestro acortador</h2>
//       <div className="flex items-center space-x-2">
//         <input
//           type="url"
//           placeholder="Pega tu enlace largo aquí"
//           value={inputUrl}
//           onChange={(e) => setInputUrl(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-100 shadow-sm"
//         />
//         <button
//           onClick={handleShorten}
//           className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
//         >
//           Acortar
//         </button>
//       </div>
//       {shortUrl && (
//         <p className="mt-4 text-green-600">
//           ¡Tu enlace corto es:{" "}
//           <a href={shortUrl} className="text-blue-600 underline">
//             {shortUrl}
//           </a>
//           !
//         </p>
//       )}
//     </AnimatedIn>
//   );
// }

// function Feature ({ title, description, className }: { title: string; description: string, className?: string }) {
//   return (
//     <AnimatedIn className={`
//     bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-100 transition
//       ${className}`}>
//       <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
//       <p className="mt-2 text-gray-600">{description}</p>
//     </AnimatedIn>
//   );
// }

// export default function Home () {
//   const [inputUrl, setInputUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");

//   const handleShorten = async () => {
//     if (!inputUrl) return;
//     setShortUrl(`https://clipto.io/${Math.random().toString(36).substring(2, 8)}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 md:p-10">
//       <div className="space-y-10">
//         {/* Encabezado */}
//         <Header />

//         {/* Acortador */}
//         <UrlShortener inputUrl={inputUrl} setInputUrl={setInputUrl} handleShorten={handleShorten} shortUrl={shortUrl} />

//         {/* Características */}
//         <section className="max-w-5xl mx-auto">
//           <AnimatedIn>
//             <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">¿Por qué elegir ClipTo?</h2>
//           </AnimatedIn>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Feature title="Enlaces cortos y personalizados" description="Personaliza tus enlaces para que sean fáciles de recordar y compartir." />
//             <Feature className="delay-150" title="Estadísticas detalladas" description="Monitorea los clics, dispositivos y ubicaciones de tus enlaces con un dashboard intuitivo." />
//             <Feature className="delay-300" title="Fácil integración" description="Usa ClipTo en tus proyectos y aplicaciones con nuestra API REST." />
//           </div>
//         </section>

//         {/* Llamada a la acción */}
//         <AnimatedIn className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-blue-600 to-blue-500 py-8 rounded-lg shadow-md text-center text-white">
//           <h2 className="text-2xl md:text-3xl font-semibold mb-4">¡Empieza a usar ClipTo hoy!</h2>
//           <p className="text-white mb-6">
//             Únete a miles de usuarios que ya están compartiendo sus enlaces de una manera más práctica y profesional.
//           </p>
//           <Link href="/login" className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-100 transition">
//             Regístrate gratis
//           </Link>
//         </AnimatedIn>

//         {/* Footer */}
//         <footer className="mt-16 text-center text-gray-500">
//           <p>© 2024 ClipTo - Todos los derechos reservados</p>
//           <nav className="flex justify-center space-x-4 mt-2">
//             <Link href="/terms" className="hover:underline">
//               Términos de servicio
//             </Link>
//             <Link href="/privacy" className="hover:underline">
//               Política de privacidad
//             </Link>
//           </nav>
//         </footer>
//       </div>
//     </div>
//   );
// }


'use client';
import AnimatedIn from "@/components/AnimatedIn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Componentes separados para secciones individuales
function Header () {
  return (
    <header className="bg-gradient-to-r from-white to-gray-50 text-center p-10 rounded-lg text-blue-500 shadow-lg">
      <h1 className="text-4xl md:text-6xl font-bold">Bienvenido a ClipTo</h1>
      <p className="mt-4 text-lg md:text-xl">Acorta, comparte y gestiona tus enlaces de manera eficiente</p>
      <Image src="/logo.png" alt="Logo de ClipTo" width={120} height={120} className="mt-4 mx-auto" />
    </header>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UrlShortener ({ inputUrl, setInputUrl, handleShorten, shortUrl }: any) {
  return (
    <AnimatedIn className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10 text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Prueba nuestro acortador</h2>
      <div className="flex items-center space-x-2">
        <input
          type="url"
          placeholder="Pega tu enlace largo aquí"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-100 shadow-sm"
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
    </AnimatedIn>
  );
}

function Feature ({ title, description, className }: { title: string; description: string, className?: string }) {
  return (
    <AnimatedIn className={`
    bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-100 transition
      ${className}`}>
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </AnimatedIn>
  );
}

export default function Home () {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!inputUrl) return;
    setShortUrl(`https://clipto.io/${Math.random().toString(36).substring(2, 8)}`);
  };

  return (
    <div className="min-h-screen bg-blue-500 p-6 md:p-10">
      <div className="space-y-10">
        {/* Encabezado */}
        <Header />

        {/* Acortador */}
        <UrlShortener inputUrl={inputUrl} setInputUrl={setInputUrl} handleShorten={handleShorten} shortUrl={shortUrl} />

        {/* Características */}
        <section className="max-w-5xl mx-auto">
          <AnimatedIn>
            <h2 className="text-3xl font-semibold text-gray-50 text-center mb-6">¿Por qué elegir ClipTo?</h2>
          </AnimatedIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature title="Enlaces cortos y personalizados" description="Personaliza tus enlaces para que sean fáciles de recordar y compartir." />
            <Feature className="delay-150" title="Estadísticas detalladas" description="Monitorea los clics, dispositivos y ubicaciones de tus enlaces con un dashboard intuitivo." />
            <Feature className="delay-300" title="Fácil integración" description="Usa ClipTo en tus proyectos y aplicaciones con nuestra API REST." />
          </div>
        </section>

        {/* Llamada a la acción */}
        <AnimatedIn className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-white to-gray-50 py-8 rounded-lg shadow-md text-center text-blue-500">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">¡Empieza a usar ClipTo hoy!</h2>
          <p className="text-blue-500 mb-6">
            Únete a miles de usuarios que ya están compartiendo sus enlaces de una manera más práctica y profesional.
          </p>
          <Link href="/login" className="text-white bg-blue-600 px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
            Regístrate gratis
          </Link>
        </AnimatedIn>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-50">
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
