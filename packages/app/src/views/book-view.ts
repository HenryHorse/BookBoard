import { define, Form, InputArray, View, History } from "@calpoly/mustang";
import { css, html } from "lit";
import {property, state} from "lit/decorators.js";
import { Book } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";



export class BookViewElement extends View<Model, Msg> {
    static uses = define({
        "mu-form": Form.Element,
        "input-array": InputArray.Element
    });

    @property()
    bookid: string = "";

    @state()
    editMode = false;

    @state()
    get book(): Book | undefined {
        return this.model.book;
    }

    constructor() {
        super("bb:model");
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.bookid) {
            this.dispatchMessage(["book/select", { bookid: this.bookid }]);
        }
    }

    render() {
        return this.editMode ? this.renderEditMode() : this.renderViewMode();
    }

    renderViewMode() {
        return html`
          <div class="page">
            ${this.book
                ? html`
                  <section class="page-title">
                    <h1>${this.book.title}</h1>
                    <button @click=${() => (this.editMode = true)}>Edit Book</button>
                  </section>
                  <section class="description">
                    <h2>Description</h2>
                    <p>${this.book.description}</p>
                  </section>
                  <section class="genres">
                    <genre-list src="/api/books/${this.book._id}"></genre-list>
                  </section>
                  <section class="years">
                    <year-list src="/api/books/${this.book._id}"></year-list>
                  </section>
                  <section class="authors">
                    <author-list src="/api/books/${this.book._id}"></author-list>
                  </section>
                `
                : html`
                  <p>Loading book details...</p>
                `}
          </div>
        `;
    }

    renderEditMode() {
        const initData = {
            title: this.book?.title,
            description: this.book?.description,
            genres: this.book?.genres.map(g => g.name) || [],
            authors: this.book?.author.map(a => a.name) || [],
            years: this.book?.publicationYear.year || []
        }
        return html`
            <div class="page">
                <section>
                    <h1>Edit Book</h1>
                    <nav>
                        <a class="close" href="#" @click=${() => (this.editMode = false)}>Close</a>
                    </nav>
                    <mu-form 
                            .init=${initData} @mu-form:submit=${this._handleSubmit}>
                        <label>
                            <span>Title</span>
                            <input name="title"/>
                        </label>
                        <label>
                            <span>Description</span>
                            <textarea name="description"></textarea>
                        </label>
                        <label>
                            <span>Genres</span>
                            <input-array name="genres">
                                <span slot="label-add">Add a genre</span>
                            </input-array>
                        </label>
                        <label>
                            <span>Authors</span>
                            <input-array name="authors">
                                <span slot="label-add">Add an author</span>
                            </input-array>
                        </label>
                        <label>
                            <span>Years</span>
                            <input-array name="years">
                                <span slot="label-add">Add a year</span>
                            </input-array>
                        </label>
                    </mu-form>
                </section>
            </div>
        `;
    }

    _handleSubmit(event: Form.SubmitEvent<Book>) {
        this.dispatchMessage([
            "book/save",
            {
                bookid: this.bookid,
                book: event.detail,
                onSuccess: () =>
                    History.dispatch(this, "history/navigate", {
                        href: `/app/books/${this.bookid}`
                    }),
                onFailure: (error: Error) =>
                    console.log("ERROR:", error)
            }
        ]);
        console.log("Is form submit", event.detail);
        this.editMode = false;
    }

    static styles = css`
        section {
            color: var(--color-text);
            background-color: var(--color-background-section);
            border-style: var(--style-border-section);
            border-color: var(--color-border-section);
            padding: var(--section-padding);
            font-family: var(--font-family-section);
            border-radius: var(--section-border-radius);
            box-shadow: var(--shadow);

        }
        section a {
            color: var(--color-text);
        }
        section a:hover {
            color: var(--color-hover);
        }
    `


}


