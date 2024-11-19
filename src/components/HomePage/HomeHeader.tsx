import Image from "next/image";
import AnimatedIn from "../AnimatedIn";

// Componentes separados para secciones individuales
export default function HomeHeader () {
  return (
    <header className="text-center p-10 text-green-600 ">
      <AnimatedIn>
        <h1 className="text-4xl md:text-6xl font-bold">Bienvenido a ClipTo</h1>
      </AnimatedIn>
      <AnimatedIn className="delay-150">
        <p className="mt-4 text-lg md:text-xl">Acorta, comparte y gestiona tus enlaces de manera eficiente</p>
      </AnimatedIn>
      <AnimatedIn className="delay-300">
        <Image src="/logo.png" alt="Logo de ClipTo" width={120} height={120} className="mt-4 mx-auto" />
      </AnimatedIn>
    </header>
  );
}

