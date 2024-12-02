import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, storage } from './config';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { Mold } from '@/types/mold';

export const moldService = {
  async getAllMolds(activeOnly: boolean = true) {
    try {
      const moldsRef = collection(db, 'molds');
      const q = activeOnly
        ? query(moldsRef, where('isActive', '==', true))
        : query(moldsRef);

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Mold[];
    } catch (error) {
      console.error('Error fetching molds:', error);
      throw error;
    }
  },

  async createMold(mold: Omit<Mold, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const docRef = await addDoc(collection(db, 'molds'), {
        ...mold,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating mold:', error);
      throw error;
    }
  },

  async updateMold(id: string, mold: Partial<Mold>) {
    try {
      const docRef = doc(db, 'molds', id);
      await updateDoc(docRef, {
        ...mold,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating mold:', error);
      throw error;
    }
  },

  async uploadImage(file: File, path: string) {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async deleteImage(path: string) {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },
};
