import { css, html, shadow } from "@calpoly/mustang"
import reset from "./styles/reset.css.js"

export class BookListElement extends HTMLElement {
    static template = html`
        <template>
            <h2>
                <svg class="icon">
                    <use href="/icons/books.svg#icon-books"/>
                </svg>
                Books
            </h2>
            <slot name="book-list"></slot>
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
        
    `;

    constructor() {
        super();
        shadow(this)
            .template(BookListElement.template)
            .styles(reset.styles, BookListElement.styles);
    }

    get src() {
        return this.getAttribute("src");
    }

    connectedCallback() {
        if (this.src) this.hydrate(this.src);
    }

    hydrate(url) {
        fetch(url)
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
        const books = json.books;
        console.log(books);
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