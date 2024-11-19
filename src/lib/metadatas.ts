import isValidHttpUrl from "./isValidHttpUrl";

export type MetadataType = {
  title: string;
  description: string;
  favicon: string;
}

export default async function validateAndFetchMetadata (url: string) {
  try {
    // Validar si la URL es válida
    if (!isValidHttpUrl(url)) {
      throw new Error('La URL proporcionada no es válida.');
    }

    // Hacer la solicitud con fetch
    const response = await fetch(url, {
      method: 'GET', redirect: 'manual',
      // headers: {
      //   'Access-Control-Allow-Origin': 'http://localhost:3000'
      // }
    });

    // Verificar el código de estado
    if (!response.ok) {
      throw new Error(`El servidor respondió con un estado no exitoso: ${response.status}`);
    }

    // Validar que el contenido sea HTML (y no binario, JSON, etc.)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error('La URL proporcionada no parece ser un recurso HTML.');
    }

    // Obtener el HTML de la página
    const html = await response.text();

    // Extraer metadatos básicos
    const metadata: MetadataType = {
      title: html.match(/<title>(.*?)<\/title>/)?.[1]?.trim() || 'Sin título',
      description: html.match(/<meta\s+name="description"\s+content="(.*?)"/i)?.[1]?.trim() || 'Sin descripción',
      favicon: html.match(/<link\s+rel="icon"\s+href="(.*?)"/i)?.[1]?.trim() || '/favicon.ico',
    };

    return { valid: true, metadata };

  } catch (error: any) {
    return { valid: false, error: error.message, metadata: null };
  }
}

// Ejemplo de uso
// validateAndFetchMetadata('https://www.ejemplo.com')
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));
