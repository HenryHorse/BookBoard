import {css, html, Observer, shadow, define, Form, InputArray } from "@calpoly/mustang"
import reset from "./styles/reset.css.js"

export class BookListElement extends HTMLElement {
    static template = html`
        <template>
            <section class="view">
                <h2>
                    <svg class="icon">
                        <use href="/icons/books.svg#icon-books"/>
                    </svg>
                    Books
                </h2>
                <slot name="book-list"></slot>
                <button id="edit">Edit</button>
            </section>
            <mu-form class="edit">
                <label>
                    <span>Books</span>
                    <input-array name="book-list">
                        <span slot="label-add">Add a book</span>
                    </input-array>
                </label>
            </mu-form>
        </template>
    `;

    static styles = css`
        :host {
            display: contents;
            --display-view-none: grid;
            --display-editor-none: none;
        }
        :host([mode="edit"]) {
            --display-view-none: none;
            --display-editor-none: grid;
        }
        :host([mode="view"]) {
            --display-view-none: grid;
            --display-editor-none: none;
        }
        section.view {
            display: var(--display-view-none, grid);
        }

        mu-form.edit {
            display: var(--display-editor-none, grid);
        }
        svg.icon {
            display: inline;
            height: var(--icon-height);
            width: var(--icon-width);
            vertical-align: bottom;
            fill: currentColor;
        }

        h2 {
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        mu-form {
            display: flex;
            flex-direction: column;
            border-style: var(--style-border-section);
            border-color: #459749;
            border-radius: 8px;
            background-color: #2c5e2e;
            padding: 1rem;
            box-shadow: var(--shadow);
            width: fit-content;
            margin: 1rem auto;
        }
        
        section.view {
            display: var(--display-view-none, grid);
        }
        mu-form.edit {
            display: var(--display-editor-none, grid);
        }
    `;

    static uses = define({
        "mu-form": Form.Element,
        "input-array": InputArray.Element
    });

    constructor() {
        super();
        shadow(this)
            .template(BookListElement.template)
            .styles(reset.styles, BookListElement.styles);
        this.addEventListener("mu-form:submit", (event) =>
            this.submit(this.src, event.detail)
        );
        this.editButton.addEventListener(
            "click",
            () => (this.mode = "edit")
        );
    }

    get src() {
        return this.getAttribute("src");
    }

    get form() {
        return this.shadowRoot.querySelector("mu-form.edit");
    }

    get mode() {
        return this.getAttribute("mode");
    }

    set mode(m) {
        this.setAttribute("mode", m);
    }

    get editButton() {
        return this.shadowRoot.getElementById("edit");
    }

    _authObserver = new Observer(this, "bb:auth");

    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization: `Bearer ${this._user.token}`
            }
        );
    }

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            this._user = user;
            if (this.src) this.hydrate(this.src);
        });
    }

    hydrate(url) {
        fetch(url, { headers: this.authorization })
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json) => {
                this.renderSlots(json);

                const books = Array.isArray(json) ? json : json.books;
                const bookTitles = books.map(book => book.title);

                this.form.init = {"book-list": bookTitles};
            })
            .catch((error) =>
                console.log(`Failed to render data ${url}:`, error)
            );
    }

    renderSlots(json) {
        const books = Array.isArray(json) ? json : json.books;
        if (books) {
            const bookList = html`
                <ul slot="book-list">
                    ${books.map((book) => html`
                            <li>
                                <a href="../books/${book._id}">${book.title}</a>
                            </li>
                        `)}
                </ul>`;
            this.replaceChildren(bookList);
        }
        else {
            console.warn("No books found in book data.")
        }
    }


    /*
        This function controls the submission of the edit form for book lists
        It allows you to add new books to book lists, but only if those books exist in the database
        To do this, it first fetches all the books, then looks at the books entered in the form, and sees if there are any that don't exist
        If there are, it'll alert the user. Otherwise, it fetches the current object's list of books, checks if there's any duplicates, and updates the list
        It then sends a PUT request to update the list in the database, and also renders the page again
     */
    submit(url, json) {
        fetch("/api/books", {headers: this.authorization})
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((books) => {
                const enteredTitles = json["book-list"];
                const validBooks = books.filter((book) =>
                    enteredTitles.includes(book.title)
                );
                const validTitles = validBooks.map((book) => book.title);
                const invalidTitles = enteredTitles.filter(
                    (title) => !validTitles.includes(title)
                );

                if (invalidTitles.length > 0) {
                    console.error(`Invalid titles: ${invalidTitles.join(", ")}`);
                    alert("You cannot add a book that does not already exist on the site.");
                    return;
                }
                return validBooks;

            })
            .then((validBooks) => {
                return fetch(url, {headers: this.authorization})
                    .then((res) => {
                        if (res.status !== 200) throw `Status: ${res.status}`;
                        return res.json();
                    })
                    .then((currentObject) => {
                        return {
                            validBooks,
                            currentBookList: currentObject.books
                        };
                    })
            })
            .then(({ validBooks, currentBookList }) => {
                const currentBookIds = currentBookList.map((book) => book._id);
                const newBooks = validBooks.filter(
                    (book) => !currentBookIds.includes(book._id)
                );

                const updatedBookList = [...currentBookList, ...newBooks];

                return fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        ...this.authorization
                    },
                    body: JSON.stringify({ books: updatedBookList })
                });
            })
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((updatedObject) => {
                this.renderSlots(updatedObject);

                const updatedBookTitles = updatedObject.books.map((book) => book.title);

                this.form.init = {"book-list": updatedBookTitles};
                this.mode = "view";
            })
            .catch((error) =>
                console.log(`Failed to render data ${url}:`, error)
            );
    }
}