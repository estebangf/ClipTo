'use client'
import Link from "next/link";
import { CalendarIcon, ClipboardIcon, CursorArrowRaysIcon, ShareIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import React, { useState } from "react";
import Short from "@/entities/Short";
import Button from "./Button";
import { useToast } from "@/contexts/ToastProvider";
import { useRouter } from "next/navigation";
import { deleteShort } from "@/lib/ShortsActions";

type ShortItemProps = {

} & Short

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ShortItem: React.FC<ShortItemProps> = ({
  shortId,
  title,
  originalUrl,
  clickCount,
  creationDate,
  lastAccessed,
}) => {
  const { showToast } = useToast();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false)

  const shortUrl = `/api/${shortId}`
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      showToast('Copiado!');
    } catch (error) {
      console.error('Error al copiar el enlace:', error);
      showToast('Error al copiar');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compartir enlace corto',
          text: '¡Mira este enlace!',
          url: shortUrl,
        });
        showToast('Compartiendo...');
      } catch (error) {
        showToast('Error al compartir el enlace:' + JSON.stringify(error));
      }
    } else {
      showToast('La función de compartir no es compatible con este navegador.');
    }
  };



  const handleDelete = async () => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta URL?");
    if (!confirmDelete) return;

    setDeleting(true)

    try {
      const response = await deleteShort(shortId)

      if (response) {
        router.refresh(); // Recarga la página y actualiza los datos
        showToast('URL eliminada con éxito');
        // Aquí deberías actualizar el estado o recargar la lista de URLs después de eliminarla
      } else {
        showToast('Error al eliminar la URL');
      }
    } catch (error) {
      console.error("Error al eliminar la URL:", error);
      showToast('Error al eliminar la URL');
    } finally {
      setDeleting(false)
    }
  };

  return (
    <div className="bg-white p-4 rounded-md"
      key={shortId}
    >
      <div className={`
        flex-row md:flex space-x-2 text-gray-500
        ${deleting && 'animate-pulse'}
      `}>
        <div className="flex-row space-y-1 flex-1">
          <div className="font-bold text-xl">{title || "Sin Titulo"}</div>
          <div className="font-semibold">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {NEXT_PUBLIC_API_BASE_URL}{shortUrl}
            </a>
          </div>
          <div className="text-sm truncate max-w-xs">{originalUrl}</div>
          <div className="flex space-x-4 pt-8">
            <div className="flex space-x-1 text-sm">
              <CursorArrowRaysIcon width={20} /><span>{clickCount}</span></div>
            <div className="flex space-x-1 text-sm">
              <CalendarIcon width={20} /><span>{new Date(creationDate).toLocaleDateString()}</span></div>
            {lastAccessed && <div className="flex space-x-1 text-sm">
              <CalendarIcon width={20} />
              <span>{new Date(lastAccessed).toLocaleDateString()}</span>
            </div>
            }
          </div>
        </div>
        <div className="flex-1 flex items-start justify-end">
          <Button disabled={deleting} variant="icon" onClick={handleCopy}><ClipboardIcon width={20} /></Button>
          <Button disabled={deleting} variant="icon" onClick={handleShare}><ShareIcon width={20} /></Button>
          {deleting ? (
            <Button disabled={deleting} variant="icon"><PencilSquareIcon width={20} /></Button>
          ) : (
            <Link href={`/dashboard/shorts/${shortId}`} rel="noopener noreferrer" className="text-blue-500">
              <Button disabled={deleting} variant="icon"><PencilSquareIcon width={20} /></Button>
            </Link>
          )}
          <Button disabled={deleting} onClick={handleDelete} className="text-red-500" variant="icon"><TrashIcon width={20} /></Button>
        </div>
      </div>
    </div>
  )
}

export default ShortItem;