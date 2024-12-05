import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Book, Author, Genre, Year } from "server/models";

export default function update(
    message: Msg,
    apply: Update.ApplyMap<Model>,
    user: Auth.User
) {
    switch (message[0]) {
        case "book/select":
            selectResource<Book>("books", message[1].bookid, user).then((book) =>
                apply((model) => ({...model, book}))
            );
            break;
        case "genre/select":
            selectResource<Genre>("genres", message[1].genreid, user).then((genre) =>
                apply((model) => ({...model, genre}))
            );
            break;
        case "author/select":
            selectResource<Author>("authors", message[1].authorid, user).then((author) =>
                apply((model) => ({...model, author}))
            );
            break;
        case "year/select":
            selectResource<Year>("years", message[1].yearid, user).then((year) =>
                apply((model) => ({...model, year}))
            );
            break;
        case "book/save":
            saveBook(message[1], user)
                .then((book) =>
                    apply((model) => ({...model, book}))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
            break;
        default:
            const unhandled: never = message[0];
            throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
}

function saveBook(
    msg: {
        bookid: string;
        book: Book;
    },
    user: Auth.User
) {
    console.log("message book: ", msg.book);
    return fetch(`/api/books/${msg.bookid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.book)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            else
                throw new Error(
                  `Failed to save book for ${msg.bookid}`
                );
        })
        .then((json: unknown) => {
            if (json) return json as Book;
            return undefined;
        });
}


function selectResource<T>(
    resourceType: string,
    resourceId: string,
    user: Auth.User
) {
    return fetch(`/api/${resourceType}/${resourceId}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) {
                return response.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Book: ", json);
                return json as T;
            }
        })
}
