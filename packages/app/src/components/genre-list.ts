import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class GenreListElement extends LitElement {
    @property() src?: string; // URL to fetch genres
    @state() genres: Array<{ _id: string; name: string }> = [];
    @state() _user?: Auth.User;

    _authObserver = new Observer<Auth.Model>(this, "bb:auth");

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
        a {
            color: var(--color-text)
        }
        a:hover {
          color: var(--color-hover);
        }
  `;

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            this._user = user;
            if (this.src) this.fetchGenres(this.src);
        });
    }

    async fetchGenres(url: string) {
        if (!this._user?.authenticated) {
            console.warn("User is not authenticated, cannot fetch genres.");
            return;
        }
        const user = this._user as Auth.AuthenticatedUser

        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.ok) {
                const json = await response.json();
                this.genres = Array.isArray(json) ? json : json.genres;
            } else {
                console.error(`Failed to fetch genres: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching genres from ${url}:`, error);
        }
    }

    render() {
        return html`
          <h2>
            <svg class="icon">
              <use href="/icons/books.svg#icon-love"></use>
            </svg>
            Genres
          </h2>
          <ul>
            ${this.genres.map(
                (genre) => html`
                <li>
                  <a href="/app/genres/${genre._id}">${genre.name}</a>
                </li>
              `
            )}
          </ul>
        `;
    }
}

