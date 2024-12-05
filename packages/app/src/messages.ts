import {Book} from "server/models";


export type Msg =
    | ["book/select", { bookid: string }]
    | ["genre/select", { genreid: string }]
    | ["author/select", { authorid: string }]
    | ["year/select", { yearid: string }]
    | ["book/save",
        {
            bookid: string;
            book: Book;
            onSuccess?: () => void;
            onFailure: (err: Error) => void;
        }
    ]