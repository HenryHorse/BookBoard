import { css, html } from "@calpoly/mustang/server";
import { Book, Genre, Author, Year } from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class AuthorPage {
    data: Author;

    constructor(data: Author) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody(),
            stylesheets: ["/styles/author.css"],
            styles: [
                css``
            ],
            scripts: [
                `import { define } from "@calpoly/mustang";
                import { GenreListElement } from "/scripts/genres.js";
                import { BookListElement} from "/scripts/books.js";
                import {YearListElement} from "/scripts/years.js";
                import {HeaderElement} from "/scripts/header.js";
    
                define({
                    "genre-list": GenreListElement,
                    "book-list": BookListElement,
                    "year-list": YearListElement,
                    "bb-header": HeaderElement
                });`
            ]
            // add more parts here later
        });
    }

    renderBody() {
        const { _id, name } = this.data;
        const authorAPIURL = `/api/authors/${_id}`;

        return html`
            <body>
                <bb-header>
                </bb-header>
    
    
                <div class="page">
                    ${this.renderPageTitle(name)}
                    ${this.renderGenreList(authorAPIURL)}
                    ${this.renderYearList(authorAPIURL)}
                    ${this.renderBookList(authorAPIURL)}
                </div>
                <script type="module" src="/scripts/darkModeToggle.js"></script>
            </body>`;
    }

    renderPageTitle(title: string) {
        return html`
            <section class="page-title">
                ${title}
            </section>
        `;
    }

    renderGenreList(authorAPIURL: string) {
        return html`
            <section class="genres">
                <genre-list src="${authorAPIURL}"></genre-list>
            </section>
        `
    }

    renderYearList(authorAPIURL: string) {
        return html`
            <section class="years">
                <year-list src="${authorAPIURL}"></year-list>
            </section>
        `
    }

    renderBookList(authorAPIURL: string) {
        return html`
            <section class="books">
                <book-list src="${authorAPIURL}"></book-list>
            </section>
        `
    }
}


