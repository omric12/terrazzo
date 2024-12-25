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
      console.error('Error getting molds:', error);
      throw error;
    }
  },

  async createMold(
    mold: Omit<Mold, 'id'> & { imageFile: File; additionalImageFiles: File[] }
  ) {
    try {
      // Upload main image to Firebase Storage
      const mainImageRef = ref(
        storage,
        `molds/${Date.now()}_${mold.imageFile.name}`
      );
      const mainImageSnapshot = await uploadBytes(mainImageRef, mold.imageFile);
      const mainImageUrl = await getDownloadURL(mainImageSnapshot.ref);

      // Upload additional images to Firebase Storage
      const additionalImageUrls = await Promise.all(
        mold.additionalImageFiles.map(async (file) => {
          const imageRef = ref(storage, `molds/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(imageRef, file);
          return await getDownloadURL(snapshot.ref);
        })
      );

      // Add mold document to Firestore
      const moldData = {
        ...mold,
        image: mainImageUrl,
        images: additionalImageUrls,
      };
      const docRef = await addDoc(collection(db, 'molds'), moldData);
      return { id: docRef.id, ...moldData };
    } catch (error) {
      console.error('Error creating mold:', error);
      throw error;
    }
  },

  async updateMold(
    id: string,
    data: Partial<Mold> & { imageFile?: File; additionalImageFiles?: File[] }
  ) {
    try {
      const moldRef = doc(db, 'molds', id);

      if (data.imageFile) {
        // Upload new main image to Firebase Storage
        const mainImageRef = ref(
          storage,
          `molds/${Date.now()}_${data.imageFile.name}`
        );
        const mainImageSnapshot = await uploadBytes(
          mainImageRef,
          data.imageFile
        );
        const mainImageUrl = await getDownloadURL(mainImageSnapshot.ref);
        data.image = mainImageUrl;
        delete data.imageFile;
      }

      if (data.additionalImageFiles) {
        // Upload new additional images to Firebase Storage
        const additionalImageUrls = await Promise.all(
          data.additionalImageFiles.map(async (file) => {
            const imageRef = ref(storage, `molds/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(imageRef, file);
            return await getDownloadURL(snapshot.ref);
          })
        );
        data.images = additionalImageUrls;
        delete data.additionalImageFiles;
      }

      await updateDoc(moldRef, data);
    } catch (error) {
      console.error('Error updating mold:', error);
      throw error;
    }
  },

  async deleteMold(id: string, imageUrl: string) {
    try {
      // Delete main image from Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Delete mold document from Firestore
      const moldRef = doc(db, 'molds', id);
      await deleteDoc(moldRef);
    } catch (error) {
      console.error('Error deleting mold:', error);
      throw error;
    }
  },
};
