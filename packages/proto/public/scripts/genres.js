import {css, html, Observer, shadow} from "@calpoly/mustang"
import reset from "./styles/reset.css.js"

export class GenreListElement extends HTMLElement {
    static template = html`
        <template>
            <h2>
                <svg class="icon">
                    <use href="/icons/books.svg#icon-love"/>
                </svg>
                Genres
            </h2>
            <slot name="genre-list"></slot>
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
            .template(GenreListElement.template)
            .styles(reset.styles, GenreListElement.styles);
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
        const genres = Array.isArray(json) ? json : json.genres;
        if (genres) {
            const genreList = html`
                <ul slot="genre-list">
                    ${genres.map((genre) => html`
                            <li>
                                <a href="../genres/${genre._id}">${genre.name}</a>
                            </li>
                        `)}
                </ul>`;
            this.replaceChildren(genreList);
        }
        else {
            console.warn("No genres found in book data.")
        }
    }
}