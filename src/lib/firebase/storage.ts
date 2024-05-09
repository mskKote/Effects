import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@lib/firebase/firebase";
import { updateBook } from "@lib/firebase/firestore";

export async function updateBookImage(bookId: string, image: File) {
  try {
    if (!bookId) throw new Error("No book ID has been provided.");

    if (!image || !image.name)
      throw new Error("A valid image has not been provided.");

    const publicImageUrl = await uploadImage(bookId, image);
    await updateBook(bookId, { bookCoverURL: publicImageUrl });

    return publicImageUrl;
  } catch (error) {
    console.error("[updatePageImage] Error processing request:", error);
  }
}

async function uploadImage(folder: string, image: File) {
  const filePath = `images/${folder}/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);

  return await getDownloadURL(newImageRef);
}
