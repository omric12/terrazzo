'use client';

import { useEffect, useState } from 'react';

import { Mold } from '@/types/mold';
import { moldService } from '@/lib/firebase/moldService';

export default function AdminMoldsPage() {
  const [molds, setMolds] = useState<Mold[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMolds();
  }, []);

  const loadMolds = async () => {
    try {
      const data = await moldService.getAllMolds(false);
      setMolds(data);
    } catch (error) {
      console.error('Error loading molds:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMoldStatus = async (mold: Mold) => {
    try {
      await moldService.updateMold(mold.id, {
        isActive: !mold.isActive,
      });
      await loadMolds();
    } catch (error) {
      console.error('Error toggling mold status:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Manage Molds</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {molds.map((mold) => (
          <div key={mold.id} className='bg-white rounded-lg shadow p-6'>
            <img
              src={mold.image}
              alt={mold.title}
              className='w-full h-48 object-cover rounded-lg mb-4'
            />
            <h2 className='text-xl font-semibold mb-2'>{mold.title}</h2>
            <div className='flex justify-between items-center'>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  mold.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                {mold.isActive ? 'Active' : 'Inactive'}
              </span>
              <button
                onClick={() => toggleMoldStatus(mold)}
                className='text-sm text-blue-600 hover:text-blue-800'>
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
