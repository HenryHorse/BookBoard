import { View } from "@calpoly/mustang";
import { html } from "lit";
import {property, state} from "lit/decorators.js";
import { Year } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import pageStyle from "../css/page";
import resetStyle from "../css/reset";
import yearStyle from "../css/year";

export class YearViewElement extends View<Model, Msg> {
    @property()
    yearid?: string;

    @state()
    get year(): Year | undefined {
        return this.model.year;
    }

    constructor() {
        super("bb:model");
    }

    render() {
        return html`
          <div class="page">
            ${this.year
            ? html`
              <section class="page-title">
                <h1>${this.year.year}</h1>
              </section>
              <section class="books">
                  <book-list src="/api/years/${this.year._id}"></book-list>
              </section>
              <section class="genres">
                  <genre-list src="/api/years/${this.year._id}"></genre-list>
              </section>
              <section class="authors">
                  <author-list src="/api/years/${this.year._id}"></author-list>
              </section>
            `
            : html`
                  <p>Loading year details...</p>
                `}
          </div>
        `;
    }

    static styles = [
        resetStyle,
        yearStyle,
        pageStyle,
    ]

    connectedCallback() {
        super.connectedCallback();
        if (this.yearid) {
            this.dispatchMessage(["year/select", { yearid: this.yearid }]);
        }
    }
}