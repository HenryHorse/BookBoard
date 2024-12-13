import { View } from "@calpoly/mustang";
import { html } from "lit";
import {property, state} from "lit/decorators.js";
import { Author } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import pageStyle from "../css/page";
import resetStyle from "../css/reset";
import authorStyle from "../css/author";

export class AuthorViewElement extends View<Model, Msg> {
    @property()
    authorid?: string;

    @state()
    get author(): Author | undefined {
        return this.model.author;
    }

    constructor() {
        super("bb:model");
    }

    render() {
        return html`
          <div class="page">
            ${this.author
            ? html`
              <section class="page-title">
                <h1>${this.author.name}</h1>
              </section>
              <section class="books">
                  <book-list src="/api/authors/${this.author._id}"></book-list>
              </section>
              <section class="years">
                  <year-list src="/api/authors/${this.author._id}"></year-list>
              </section>
              <section class="genres">
                  <genre-list src="/api/authors/${this.author._id}"></genre-list>
              </section>
            `
            : html`
                  <p>Loading author details...</p>
                `}
          </div>
        `;
    }

    static styles = [
        authorStyle,
        pageStyle,
        resetStyle,
    ]

    connectedCallback() {
        super.connectedCallback();
        if (this.authorid) {
            this.dispatchMessage(["author/select", { authorid: this.authorid }]);
        }
    }
}