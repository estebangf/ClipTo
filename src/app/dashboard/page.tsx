import ShortItemSkeleton from '@/components/ShortItemSkeleton';
import Short from '@/entities/Short';
import React, { Suspense } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import ShortItem from '@/components/ShortItem';

const Dashboard = async () => {

  return (
    <div className="p-8">
      <div className='flex border-b mb-8 p-4 pb-8'>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Link href='/dashboard/shorts/new'
          className='ml-auto'
        >
          <Button>Crear link</Button>
        </Link>
      </div>
      <Suspense fallback={
        <div className='space-y-8'>
          {[0, 0, 0, 0].map((e, i) => (
            <ShortItemSkeleton key={`UrlItemSkeleton-${i}`} />
          ))}
        </div>
      }>
        <UrlsList />
      </Suspense>
    </div>
  );
};

export default Dashboard


async function getUrls () {
  // const response = await fetch(``process.env.NEXT_PUBLIC_API_BASE_URL'/api/dashboard',{ next: { revalidate: 3600 } })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shorts`);
  const urls: Short[] = await response.json();
  // if (!urls) notFound()
  return urls
}

const UrlsList = async () => {
  const urls: Short[] = await getUrls();

  return (
    <div className='space-y-8'>
      {
        urls.map((url) => (
          <ShortItem key={url.shortId} {...url} />
        ))
      }
    </div>
  )
}