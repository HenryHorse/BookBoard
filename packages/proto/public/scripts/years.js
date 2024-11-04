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

    get src() {
        return this.getAttribute("src");
    }

    connectedCallback() {
        if (this.src) this.hydrate(this.src);
    }

    hydrate(url) {
        fetch(url)
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json) => this.renderSlots(json))
            .catch((error) =>
                console.log(`Failed to render data ${url}:`, error)
            );
    }

    renderSlots(json) {
        const publicationYear = json.publicationYear
        if (publicationYear) {
            const yearElement = html`
                <ul slot="year-list">
                    <li>
                        <a href="../years/${publicationYear._id}">${publicationYear.year}</a>
                    </li>
                </ul>`;
            this.replaceChildren(yearElement);
        }
        else {
            console.warn("No publication year found in book data.")
        }
    }
}