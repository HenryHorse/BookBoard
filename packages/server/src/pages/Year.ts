import { css, html } from "@calpoly/mustang/server";
import { Book, Genre, Author, Year } from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class YearPage {
    data: Year;

    constructor(data: Year) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody(),
            stylesheets: ["/styles/year.css"],
            styles: [
                css``
            ],
            scripts: [
                `import { define } from "@calpoly/mustang";
                import { GenreListElement } from "/scripts/genres.js";
                import { AuthorListElement} from "/scripts/authors.js";
                import {BookListElement} from "/scripts/books.js";
                import {HeaderElement} from "/scripts/header.js";
    
                define({
                    "book-list": BookListElement,
                    "author-list": AuthorListElement,
                    "genre-list": GenreListElement,
                    "bb-header": HeaderElement
                });`
            ]
            // add more parts here later
        });
    }

    renderBody() {
        const { _id, year } = this.data;
        const yearAPIURL = `/api/years/${_id}`;

        return html`
            <body>
                <bb-header>
                </bb-header>
    
    
                <div class="page">
                    ${this.renderPageTitle(year)}
                    ${this.renderBookList(yearAPIURL)}
                    ${this.renderGenreList(yearAPIURL)}
                    ${this.renderAuthorList(yearAPIURL)}
                </div>
                <script type="module" src="/scripts/darkModeToggle.js"></script>
            </body>`;
    }

    renderPageTitle(title: number) {
        return html`
            <section class="page-title">
                ${title}
            </section>
        `;
    }


    renderBookList(yearAPIURL: string) {
        return html`
            <section class="books">
                <book-list src="${yearAPIURL}"></book-list>
            </section>
        `
    }

    renderGenreList(yearAPIURL: string) {
        return html`
            <section class="genres">
                <genre-list src="${yearAPIURL}"></genre-list>
            </section>
        `
    }

    renderAuthorList(yearAPIURL: string) {
        return html`
            <section class="authors">
                <author-list src="${yearAPIURL}"></author-list>
            </section>
        `
    }
}


