import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import {property, state} from "lit/decorators.js";
import { Genre } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

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

    connectedCallback() {
        super.connectedCallback();
        if (this.genreid) {
            this.dispatchMessage(["genre/select", { genreid: this.genreid }]);
        }
    }
}