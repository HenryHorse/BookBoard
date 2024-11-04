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
                `import { define } from "@calpoly/mustang";
                import { GenreListElement } from "/scripts/genres.js";
                import { AuthorListElement} from "/scripts/authors.js";
                import {YearListElement} from "/scripts/years.js";
                import {HeaderElement} from "/scripts/header.js";
    
                define({
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
        const { title, author, genres, publicationYear, description} = this.data;
        return html`
            <body>
                <bb-header>
                </bb-header>
    
    
                <div class="page">
                    ${this.renderPageTitle(title)}
                    ${this.renderDescription(description)}
                    ${this.renderGenreList(genres)}
                    ${this.renderYear(publicationYear)}
                    ${this.renderAuthorList(author)}
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

  renderDescription(description: string) {
        return html`
            <section class="description">
                <h2>Description</h2>
                <p>${description}</p>
            </section>
        `
  }

  renderGenreList(genres: Genre[]) {
        const genreList = genres
            ? html`
                    <ul slot="genre-list">
                        ${genres.map((genre) => html`
                            <li>
                                <a href="../genres/${genre.name.toLowerCase()}.html">${genre.name}</a>
                            </li>
                        `)}
                    </ul>`
            : "";

        return html`
            <section class="genre">
                <genre-list>
                    ${genreList}
                </genre-list>
            </section>
        `
  }

  renderYear(publicationYear: Year) {
        return html`
            <section class="year">
                <year-list>
                    <ul slot="year-list">
                        <li>
                            <a href="../years/${publicationYear.year}.html">${publicationYear.year}</a>
                        </li>
                    </ul>
                </year-list>
            </section>
        `
  }

  renderAuthorList(authors: Author[]) {
        const authorList = authors
            ? html`<ul slot="author-list">
                    ${authors.map((author) => html`
                            <li>
                                <a href="../authors/${author.name.replace(/\s+/g, "").toLowerCase()}.html">${author.name}</a>
                            </li>
                        `)}
                </ul>`
            : "";
        return html`
            <section class="author">
                <author-list>
                    ${authorList}
                </author-list>
            </section>
        `
  }
}


