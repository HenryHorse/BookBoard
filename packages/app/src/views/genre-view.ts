import { View } from "@calpoly/mustang";
import { html } from "lit";
import {property, state} from "lit/decorators.js";
import { Genre } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import pageStyle from "../css/page";
import resetStyle from "../css/reset";
import genreStyle from "../css/genre";

export class GenreViewElement extends View<Model, Msg> {
    @property()
    genreid?: string;

    @state()
    get genre(): Genre | undefined {
        return this.model.genre;
    }

    constructor() {
        super("bb:model");
    }

    render() {
        return html`
          <div class="page">
            ${this.genre
            ? html`
              <section class="page-title">
                <h1>${this.genre.name}</h1>
              </section>
              <section class="books">
                  <book-list src="/api/genres/${this.genre._id}"></book-list>
              </section>
              <section class="years">
                  <year-list src="/api/genres/${this.genre._id}"></year-list>
              </section>
              <section class="authors">
                  <author-list src="/api/genres/${this.genre._id}"></author-list>
              </section>
            `
            : html`
                  <p>Loading genre details...</p>
                `}
          </div>
        `;
    }

    static styles = [
        resetStyle,
        pageStyle,
        genreStyle
    ]

    connectedCallback() {
        super.connectedCallback();
        if (this.genreid) {
            this.dispatchMessage(["genre/select", { genreid: this.genreid }]);
        }
    }
}