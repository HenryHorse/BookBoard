import { css, html, shadow, Observer } from "@calpoly/mustang"
import reset from "./styles/reset.css.js"

export class AuthorListElement extends HTMLElement {
    static template = html`
        <template>
            <h2>
                <svg class="icon">
                    <use href="/icons/books.svg#icon-idea"/>
                </svg>
                Authors
            </h2>
            <slot name="author-list"></slot>
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
            .template(AuthorListElement.template)
            .styles(reset.styles, AuthorListElement.styles);
    }

    get src() {
        return this.getAttribute("src");
    }

    _authObserver = new Observer(this, "bb:auth");

    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization: `Bearer ${this._user.token}`
            }
        );
    }

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            this._user = user;
            if (this.src) this.hydrate(this.src);
        });
    }

    hydrate(url) {
        fetch(url, { headers: this.authorization })
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
        const authors = Array.isArray(json) ? json : (json.authors || json.author);
        if (authors) {
            const authorList = html`
                <ul slot="author-list">
                    ${authors.map((author) => html`
                            <li>
                                <a href="../authors/${author._id}">${author.name}</a>
                            </li>
                        `)}
                </ul>`;
            this.replaceChildren(authorList);
        }
        else {
            console.warn("No authors found in book data.")
        }
    }


}