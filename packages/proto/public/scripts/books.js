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
            </section>
            <mu-form class="edit">
                <label>
                    <span>New Book</span>
                    <input name="bookid"/>
                </label>
            </mu-form>
        </template>
    `;

    static styles = css`
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
    }

    get src() {
        return this.getAttribute("src");
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
            .then((json) => this.renderSlots(json))
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
}