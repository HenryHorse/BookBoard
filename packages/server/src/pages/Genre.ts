import { css, html } from "@calpoly/mustang/server";
import { Book, Genre, Author, Year } from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class GenrePage {
    data: Genre;

    constructor(data: Genre) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody(),
            stylesheets: ["/styles/genre.css"],
            styles: [
                css``
            ],
            scripts: [
                `import { define } from "@calpoly/mustang";
                import { BookListElement } from "/scripts/books.js";
                import { AuthorListElement} from "/scripts/authors.js";
                import {YearListElement} from "/scripts/years.js";
                import {HeaderElement} from "/scripts/header.js";
    
                define({
                    "book-list": BookListElement,
                    "author-list": AuthorListElement,
                    "year-list": YearListElement,
                    "bb-header": HeaderElement
                });`
            ]
            // add more parts here later
        });
    }

    renderBody() {
        const { _id, name } = this.data;
        const genreAPIURL = `/api/genres/${_id}`;

        return html`
            <body>
                <bb-header>
                </bb-header>
    
    
                <div class="page">
                    ${this.renderPageTitle(name)}
                    ${this.renderBookList(genreAPIURL)}
                    ${this.renderYearList(genreAPIURL)}
                    ${this.renderAuthorList(genreAPIURL)}
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


    renderBookList(genreAPIURL: string) {
        return html`
            <section class="books">
                <book-list src="${genreAPIURL}"></book-list>
            </section>
        `
    }

    renderYearList(genreAPIURL: string) {
        return html`
            <section class="years">
                <year-list src="${genreAPIURL}"></year-list>
            </section>
        `
    }

    renderAuthorList(genreAPIURL: string) {
        return html`
            <section class="authors">
                <author-list src="${genreAPIURL}"></author-list>
            </section>
        `
    }
}


