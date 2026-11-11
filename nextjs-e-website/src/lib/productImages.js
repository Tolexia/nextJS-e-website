import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/components/config";
import { ensureAdminAuth } from "@/components/auth";

const storage = getStorage(firebase_app);
const MAX_FILES = 5;
const MAX_BYTES = 5 * 1024 * 1024;
const EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function isStoredProductImage(src) {
  return typeof src === "string" && src.includes("firebasestorage.googleapis.com");
}

export async function deleteStoredImages(srcs) {
  const stored = (srcs || []).filter(isStoredProductImage);
  await Promise.all(stored.map(async (src) => {
    try {
      await deleteObject(ref(storage, src));
    } catch (error) {
      console.error(error);
    }
  }));
}

export async function replaceProductImages(files, previousSrcs) {
  if (!files || files.length === 0) {
    throw new Error("Aucune image sélectionnée");
  }
  if (files.length > MAX_FILES) {
    throw new Error("5 images maximum");
  }

  await ensureAdminAuth();
  const uploaded = [];

  try {
    for (const file of files) {
      const extension = EXTENSIONS[file.type];
      if (!extension || file.size > MAX_BYTES) {
        throw new Error("Image invalide (jpeg, png, webp ou gif, 5 Mo max)");
      }
      const fileRef = ref(storage, `products/${crypto.randomUUID()}.${extension}`);
      await uploadBytes(fileRef, file, { contentType: file.type });
      uploaded.push(await getDownloadURL(fileRef));
    }
  } catch (error) {
    await deleteStoredImages(uploaded);
    throw error;
  }

  await deleteStoredImages(previousSrcs);
  return uploaded;
}
