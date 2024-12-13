import { define, Form, InputArray, View, History } from "@calpoly/mustang";
import { html } from "lit";
import {property, state} from "lit/decorators.js";
import { Book } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import bookStyle from "../css/book";
import pageStyle from "../css/page";
import resetStyle from "../css/reset";



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
        return html`
            <div class="page">
                <section>
                    <h1>Edit Book</h1>
                    <nav>
                        <a class="close" href="#" @click=${() => (this.editMode = false)}>Close</a>
                    </nav>
                    <mu-form 
                            .init=${this.book} @mu-form:submit=${this._handleSubmit}>
                        <label>
                            <span>Title</span>
                            <input name="title"/>
                        </label>
                        <label>
                            <span>Description</span>
                            <textarea name="description"></textarea>
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

    static styles = [
        bookStyle,
        pageStyle,
        resetStyle
    ];


}


