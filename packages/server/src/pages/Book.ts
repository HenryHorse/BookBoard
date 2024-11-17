import { css, html } from "@calpoly/mustang/server";
import { Book, Genre, Author, Year } from "../models";
import renderPage from "./renderPage"; // generic page renderer

export class BookPage {
    data: Book;

    constructor(data: Book) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody(),
            stylesheets: ["/styles/book.css"],
            styles: [
                css``
            ],
            scripts: [
                `import { define, Auth } from "@calpoly/mustang";
                import { GenreListElement } from "/scripts/genres.js";
                import { AuthorListElement} from "/scripts/authors.js";
                import {YearListElement} from "/scripts/years.js";
                import {HeaderElement} from "/scripts/header.js";
       
    
                define({
                    "mu-auth": Auth.Provider,
                    "genre-list": GenreListElement,
                    "author-list": AuthorListElement,
                    "year-list": YearListElement,
                    "bb-header": HeaderElement
                });`
            ]
            // add more parts here later
        });
    }

    renderBody() {
        const { _id, title, description} = this.data;
        const bookAPIURL = `/api/books/${_id}`;

        return html`
            <body>
                <mu-auth provides="bb:auth">
                    <bb-header></bb-header>
        
        
                    <div class="page">
                        ${this.renderPageTitle(title)}
                        ${this.renderDescription(description)}
                        ${this.renderGenreList(bookAPIURL)}
                        ${this.renderYear(bookAPIURL)}
                        ${this.renderAuthorList(bookAPIURL)}
                    </div>
                    <script type="module" src="/scripts/darkModeToggle.js"></script>
                </mu-auth>
            </body>`;
    }

    renderPageTitle(title: string) {
        return html`
            <section class="page-title">
                ${title}
            </section>
        `;
    }

    renderDescription(description: string) {
        return html`
            <section class="description">
                <h2>Description</h2>
                <p>${description}</p>
            </section>
        `
    }

    renderGenreList(bookAPIURL: string) {
        return html`
            <section class="genre">
                <genre-list src="${bookAPIURL}"></genre-list>
            </section>
        `
    }

    renderYear(bookAPIURL: string) {
        return html`
            <section class="year">
                <year-list src="${bookAPIURL}"></year-list>
            </section>
        `
    }

    renderAuthorList(bookAPIURL: string) {
        return html`
            <section class="author">
                <author-list src="${bookAPIURL}"></author-list>
            </section>
        `
    }
}


