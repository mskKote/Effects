import IBookPage from "./IBookPage";

export default interface IBook {
  name: string;
  tags: string[];
  genres: string[];
  categories: string[];
  language: string;
  pages: IBookPage[];
  bookCoverURL: string;
}
