export interface Mold {
  id?: string;
  title: string;
  name: string;
  powder: string;
  binder: string;
  description: string;
  image: string;
  price: string;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
