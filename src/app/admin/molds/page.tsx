'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Mold } from '@/types/mold';
import { MoldFormModal } from './moldFormModal';
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

  const handleCreateOrUpdateMold = async (data: Mold) => {
    try {
      console.log('data:', data);
      if (data.id) {
        await moldService.updateMold(data.id, data);
      } else {
        await moldService.createMold(data);
      }
      loadMolds();
    } catch (error) {
      console.error('Error saving mold:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Manage Molds</h1>
      <div className='mb-6'>
        <MoldFormModal onSubmit={handleCreateOrUpdateMold} />
      </div>
      {loading ? (
        <p>Loading molds...</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {molds.map((mold) => (
            <div key={mold.id} className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-bold'>{mold.title}</h2>
              <img
                src={mold.image}
                alt={mold.title}
                className='w-full h-48 object-cover mt-4'
              />
              <MoldFormModal mold={mold} onSubmit={handleCreateOrUpdateMold}>
                <Button variant='outline' className='mt-4'>
                  Edit
                </Button>
              </MoldFormModal>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
