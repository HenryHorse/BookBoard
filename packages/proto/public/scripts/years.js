import { css, html, shadow } from "@calpoly/mustang"
import reset from "./styles/reset.css.js"

export class YearListElement extends HTMLElement {
    static template = html`
        <template>
            <h2>
                <svg class="icon">
                    <use href="/icons/books.svg#icon-time"/>
                </svg>
                Years
            </h2>
            <slot name="year-list"></slot>
        </template>
    `;

    static styles = css`
        svg.icon {
            display: inline;
            height: var(--icon-height);
            width: var(--icon-width);
            vertical-align: bottom;
            fill: currentColor;
        }
        h2 {
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }
        
    `;

    constructor() {
        super();
        shadow(this)
            .template(YearListElement.template)
            .styles(reset.styles, YearListElement.styles);
    }
}