import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class AuthorListElement extends LitElement {
    @property() src?: string; // URL to fetch authors
    @state() authors: Array<{ _id: string; name: string }> = [];
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
            if (this.src) this.fetchAuthors(this.src);
        });
    }

    async fetchAuthors(url: string) {
        if (!this._user?.authenticated) {
            console.warn("User is not authenticated, cannot fetch authors.");
            return;
        }
        const user = this._user as Auth.AuthenticatedUser

        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.ok) {
                const json = await response.json();
                this.authors = Array.isArray(json) ? json : (json.authors || json.author);
            } else {
                console.error(`Failed to fetch authors: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching authors from ${url}:`, error);
        }
    }

    render() {
        return html`
          <h2>
            <svg class="icon">
              <use href="/icons/books.svg#icon-idea"></use>
            </svg>
            Authors
          </h2>
          <ul>
            ${this.authors.map(
            (author) => html`
                <li>
                  <a href="/app/authors/${author._id}">${author.name}</a>
                </li>
              `
        )}
          </ul>
        `;
    }
}

