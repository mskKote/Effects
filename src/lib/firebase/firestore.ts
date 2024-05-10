import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
  addDoc,
  Query,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@lib/firebase/firebase";
import IBookPage from "@interfaces/IBookPage";
import IBook from "@interfaces/IBook";

const FSCollections = {
  books: "books",
  pages: "pages",
  bookPath: (bookId: string) => `${FSCollections.books}/${bookId}`,
  pagesPath: (bookId: string) =>
    `${FSCollections.books}/${bookId}/${FSCollections.pages}`,
};

/**
 * TODO: (под rules auth роли админа)
 * TODO: (свободно или по подписке)
 * TODO: Читать с индексом по названию или тэгам
 */

//#region ADD

export async function addBook(book: IBook) {
  try {
    await addDoc(collection(db, FSCollections.books), book);
  } catch (e) {
    console.error("[addContent] Error adding document: ", e);
  }
}

export async function addPageToBook(bookId: string, page: IBookPage) {
  if (!bookId) {
    throw new Error("[addPageToBook] No bookId was provided.");
  }
  if (!page) {
    throw new Error("[addPageToBook] A valid page has not been provided.");
  }

  try {
    await addDoc(collection(db, FSCollections.pagesPath(bookId)), page);
  } catch (e) {
    console.error("[addPageToBook] Error adding document: ", e);
  }
}

//#endregion

//#region EDIT

/**
 * Update meta about the book
 * @param bookId
 * @param book
 */
export async function updateBook(bookId: string, book: Partial<IBook>) {
  const bookRef = doc(collection(db, FSCollections.bookPath(bookId)), bookId);
  if (bookRef) await updateDoc(bookRef, book);
}

/**
 * Update the page
 * @param bookId
 * @param pageId
 * @param page
 */
export async function updateBookPage(
  bookId: string,
  pageId: string,
  page: Partial<IBookPage>
) {
  const pageRef = doc(collection(db, FSCollections.pagesPath(bookId)), pageId);
  if (pageRef) await updateDoc(pageRef, page);
}

//#endregion

//#region DELETE
export async function deleteBook(bookId: string) {
  const bookRef = doc(collection(db, FSCollections.bookPath(bookId)), bookId);
  if (bookRef) await deleteDoc(bookRef);
}

export async function deleteBookPage(bookId: string, pageId: string) {
  const pageRef = doc(collection(db, FSCollections.pagesPath(bookId)), pageId);
  if (pageRef) await deleteDoc(pageRef);
}
//#endregion

//#region GET & SEARCH

export async function getBookById(bookId: string) {
  if (!bookId) {
    console.error("[getBookById] Invalid ID received: ", bookId);
    return;
  }
  const docRef = doc(db, FSCollections.books, bookId);
  const docSnap = await getDoc(docRef);
  // const q = query(
  //   collection(db, FSCollections.pagesPath(bookId)),
  //   orderBy("timestamp", "desc")
  // );
  // const results = await getDocs(q);
  // https://cloud.google.com/firestore/docs/samples/firestore-data-get-sub-collections
  return {
    ...docSnap.data(),
    timestamp: docSnap.data()?.timestamp.toDate(),
  };
}

type Filters = Partial<{
  name: string;
  tags: string[];
  genres: string[];
  categories: string[];
  language: string;
}>;

function applyQueryFilters(
  q: Query,
  { name, tags, genres, categories, language }: Filters
) {
  if (name) q = query(q, where("name", "in", name));
  if (tags) q = query(q, where("tags", "array-contains", tags));
  if (genres) q = query(q, where("genres", "array-contains", genres));
  if (categories)
    q = query(q, where("categories", "array-contains", categories));
  if (language) q = query(q, where("categories", "array-contains", language));
  return q;
}

export async function getBooks(filters: Filters = {}) {
  let q = query(collection(db, FSCollections.books));

  q = applyQueryFilters(q, filters);
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      timestamp: doc.data().timestamp.toDate(),
    };
  });
}

//#endregion
