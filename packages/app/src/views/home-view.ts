import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Book, Author, Genre } from "server/models";
import pageStyle from "../css/page";
import resetStyle from "../css/reset";
import homeStyle from "../css/home";

export class HomeViewElement extends LitElement {
    bookSrc = "/api/books";
    authorSrc = "/api/authors";
    genreSrc = "/api/genres";


    @state() bookIndex = new Array<Book>();
    @state() authorIndex = new Array<Author>();
    @state() genreIndex = new Array<Genre>();


    render() {
        const bookList = this.bookIndex.map(this.renderBook);
        const authorList = this.authorIndex.map(this.renderAuthor);
        const genreList = this.genreIndex.map(this.renderGenre);

        return html`
          <main class="page">
            <section class="books">
                <h2>Books</h2>
                <ul>${bookList}</ul>
            </section>
            <section class="authors">
                <h2>Authors</h2>
                <ul>${authorList}</ul>
            </section>
            <section class="genres">
                <h2>Genres</h2>
                <ul>${genreList}</ul>
            </section>
          </main>
        `;


    }

    static styles = [
        resetStyle,
        pageStyle,
        homeStyle,
    ]

    renderBook(book: Book) {
        return html`<li><a href="/app/books/${book._id}">${book.title}</a></li>`;
    }

    renderAuthor(author: Author) {
        return html`<li><a href="/app/authors/${author._id}">${author.name}</a></li>`;
    }

    renderGenre(genre: Genre) {
        return html`<li><a href="/app/genres/${genre._id}">${genre.name}</a></li>`;
    }

    hydrate(url: string, type: "books" | "authors" | "genres") {
        fetch(url, {
            headers: Auth.headers(this._user)
        })
            .then((res: Response) => {
                if (res.status === 200) return res.json();
                throw `Server responded with status ${res.status}`;
            })
            .then((json: unknown) => {
                if (json) {
                    switch (type) {
                        case "books":
                            const books = json as Array<Book>;
                            this.bookIndex = books;
                            break;
                        case "authors":
                            const authors = json as Array<Author>;
                            this.authorIndex = authors;
                            break;
                        case "genres":
                            const genres = json as Array<Genre>;
                            this.genreIndex = genres;
                            break;
                    }
                }
            })
            .catch((err) =>
                console.log("Failed to tour data:", err)
            );
    }

    _authObserver = new Observer<Auth.Model>(this, "bb:auth");
    _user = new Auth.User();

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            if (user) {
                this._user = user;
            }
            this.hydrate(this.bookSrc, "books");
            this.hydrate(this.authorSrc, "authors");
            this.hydrate(this.genreSrc, "genres");
        });
    }
}