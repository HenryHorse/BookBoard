import { html } from "lit";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import pageStyle from "../css/page";
import resetStyle from "../css/reset";

export class AllAuthorsViewElement extends View<Model, Msg> {
    render() {
        return html`
          <div class="page">
              <section>
                  <author-list src="/api/authors"></author-list>
              </section>
          </div>
        `;
    }

    static styles = [
        pageStyle,
        resetStyle
    ];

}
