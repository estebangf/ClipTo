import React from "react";
import AnimatedIn from "../AnimatedIn";

const UpcomingFeatures = () => {
  return (
    <AnimatedIn className="bg-green-100 p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-green-700 text-2xl font-bold mb-4 text-center">
        Próximas Características
      </h2>
      <ul className="space-y-4">
        <li className="flex items-start">
          <div className="bg-green-700 text-white rounded-full p-2 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-3-3v6m-7 8h14a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">
              Acceso a Metadatos
            </h3>
            <p className="text-green-700">
              Extraeremos información como el título e ícono de la página para
              personalizar los enlaces.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-green-700 text-white rounded-full p-2 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">
              Verificación de Seguridad
            </h3>
            <p className="text-green-700">
              Detectaremos posibles amenazas analizando las URL enviadas con
              herramientas avanzadas.
            </p>
          </div>
        </li>
      </ul>
    </AnimatedIn>
  );
};

export default UpcomingFeatures;
