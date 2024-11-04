
import { Book, Genre, Author, Year} from "../models"
import { getAuthor } from "./author-svc";
import { getBook } from "./book-svc"
import { getGenre } from "./genre-svc"
import { getYear } from "./year-svc"


const twok: Book = getBook('TWoK');
const fantasy: Genre = getGenre('Fantasy');
const bs: Author = getAuthor('BrandonSanderson');
const year2011: Year = getYear("year2010");

twok.genres.push(fantasy);
twok.author.push(bs);


bs.books.push(twok);
bs.genres.push(fantasy);

fantasy.books.push(twok);
fantasy.authors.push(bs);

year2011.books.push(twok)
year2011.authors.push(bs);


export {getAuthor, getBook, getGenre, getYear}

