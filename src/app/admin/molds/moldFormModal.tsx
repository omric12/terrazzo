'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mold } from '@/types/mold';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface MoldFormModalProps {
  mold?: Mold;
  onSubmit: (
    data: Mold & { imageFile: File; additionalImageFiles: File[] }
  ) => void;
  children?: React.ReactNode;
}

export function MoldFormModal({
  mold,
  onSubmit,
  children,
}: MoldFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Mold, 'id'>>({
    defaultValues: mold
      ? {
          title: mold.title,
          name: mold.name,
          powder: mold.powder,
          binder: mold.binder,
          description: mold.description,
          price: mold.price,
          isActive: mold.isActive,
        }
      : {},
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const handleFormSubmit = (data: Mold) => {
    if (mainImage) {
      onSubmit({
        ...data,
        imageFile: mainImage,
        additionalImageFiles: additionalImages,
      });
    } else {
      console.error('Main image is required');
    }
    setIsOpen(false);
    reset();
    setMainImage(null);
    setAdditionalImages([]);
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleAdditionalImagesUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImages(files);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button variant='outline'>Add New Mold</Button>}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{mold ? 'Edit Mold' : 'Create New Mold'}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-4 pb-6'>
          <div>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className='text-red-500 text-sm'>{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='powder'>Powder</Label>
            <Input
              id='powder'
              {...register('powder', { required: 'Powder is required' })}
            />
            {errors.powder && (
              <p className='text-red-500 text-sm'>{errors.powder.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='binder'>Binder</Label>
            <Input
              id='binder'
              {...register('binder', { required: 'Binder is required' })}
            />
            {errors.binder && (
              <p className='text-red-500 text-sm'>{errors.binder.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='description'>Description</Label>
            <Textarea id='description' {...register('description')} />
          </div>

          <div>
            <Label htmlFor='image'>Main Image</Label>
            <Input
              id='image'
              type='file'
              accept='image/*'
              {...register('image', { required: 'Main image is required' })}
              onChange={handleMainImageUpload}
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
            {mainImage && (
              <div className='mt-2'>
                <img
                  src={URL.createObjectURL(mainImage)}
                  alt='Main'
                  className='w-full max-w-xs h-auto'
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              {...register('price', { required: 'Price is required' })}
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='additionalImages'>Additional Images</Label>
            <Input
              id='additionalImages'
              type='file'
              multiple
              accept='image/*'
              onChange={handleAdditionalImagesUpload}
            />
            <div className='mt-2 flex flex-wrap gap-2'>
              {additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={`Additional ${index + 1}`}
                  className='w-20 h-20 object-cover'
                />
              ))}
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox id='isActive' {...register('isActive')} />
            <Label htmlFor='isActive'>Is Active</Label>
          </div>

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
