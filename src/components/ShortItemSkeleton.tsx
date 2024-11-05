import { CalendarIcon, ClipboardIcon, CursorArrowRaysIcon, ShareIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const ShortItemSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-white p-4 rounded-md">
      <div className="flex space-x-2">
        <div className="flex-row space-y-1 w-1/2">
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
          <div className="flex space-x-4 pt-8">
            <div className="flex space-x-1 text-sm">
              <CursorArrowRaysIcon width={20} />
              <div className="w-8 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex space-x-1 text-sm">
              <CalendarIcon width={20} />
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex space-x-1 text-sm">

              <CalendarIcon width={20} />
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-start justify-end">
          <button disabled className='rounded-full p-2 hover:bg-gray-100'><ClipboardIcon width={20} /></button>
          <button disabled className='rounded-full p-2 hover:bg-gray-100'><ShareIcon width={20} /></button>
          <button disabled className='rounded-full p-2 hover:bg-gray-100'><PencilSquareIcon width={20} /></button>
          <button disabled className='rounded-full p-2 hover:bg-gray-100'><TrashIcon width={20} /></button>
        </div>
      </div>
    </div>
  );
};


export default ShortItemSkeleton