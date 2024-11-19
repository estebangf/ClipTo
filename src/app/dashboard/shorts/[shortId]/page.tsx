'use client'

import Button from '@/components/Button';
import { useToast } from '@/contexts/ToastProvider';
import { getShort, updateShort, createShort } from '@/lib/ShortsActions';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type AddShortFormProps = object

const AddShortForm: React.FC<AddShortFormProps> = ({ }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { shortId }: { shortId: string } = useParams();
  const isEditMode = shortId != 'new';
  const [formData, setFormData] = useState({ title: '', originalUrl: '' });
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (isEditMode) {
      // Aquí puedes hacer una solicitud para obtener los datos del enlace
      const fetchLinkData = async () => {
        const response = await getShort(shortId)
        // console.log("DATA: ", data)
        setFormData({ title: response.title, originalUrl: response.originalUrl });
        setLoading(false)
      };
      fetchLinkData();
    }
  }, [isEditMode, shortId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (isEditMode) {
        // const response = await updateShort({ shortId, ...formData })
        const response = await updateShort({ shortId, title: formData.title })
        console.log(response)
        showToast('Short actualizado')
      } else {
        const response = await createShort({ ...formData })
        // if (response.insertedId)
        // router.replace(`${response.insertedId}`)
        if (response) {
          router.push('/dashboard')
          showToast('Short creado')
        }
      }

    } catch (err: any) {
      setError(err.message || 'Error inesperado.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className='flex border-b mb-8 p-4 pb-8'>
        <h1 className="text-3xl font-semibold">Añadir Nueva URL</h1>
        <Link href='/dashboard'
          className='ml-auto'
        >
          <Button>Dashboard</Button>
        </Link>
      </div>

      <div className={`
        mb-6 p-8 bg-white rounded shadow-sm
        ${loading && 'animate-pulse'}
        `}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className='font-semibold'>Titulo</label>
          <input
            disabled={saving || loading}
            type="title"
            placeholder="Titulo del link"
            className="rounded p-2 mb-6 border border-gray-300 focus:border-green-400 focus:shadow-md focus:shadow-green-200 focus:outline-none focus:ring-0"
            value={formData.title}
            onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
            required
          />
          <label className='font-semibold'>Url</label>
          <input
            disabled={saving || loading || isEditMode}
            type="url"
            placeholder="https://example.com"
            className="rounded p-2 mb-6 border border-gray-300 focus:border-green-400 focus:shadow-md focus:shadow-green-200 focus:outline-none focus:ring-0"
            value={formData.originalUrl}
            onChange={(e) => setFormData(p => ({ ...p, originalUrl: e.target.value }))}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            disabled={saving || loading}
          >
            {saving ? isEditMode ? 'Guardardando...' : 'Acortartando...' : isEditMode ? 'Guardar' : 'Acortar URL'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddShortForm;
