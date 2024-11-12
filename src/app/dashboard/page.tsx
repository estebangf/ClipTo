import ShortItemSkeleton from '@/components/ShortItemSkeleton';
import Short from '@/entities/Short';
import React, { Suspense } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import ShortItem from '@/components/ShortItem';
import { getShorts } from '@/lib/ShortsActions';

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


const UrlsList = async () => {
  const urls: Short[] = await getShorts();

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