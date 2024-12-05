import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class BookListElement extends LitElement {
    @property() src?: string; // URL to fetch books
    @state() books: Array<{ _id: string; title: string }> = [];
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
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 0.5rem 0;
        }
        a {
          text-decoration: none;
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
            if (this.src) this.fetchBooks(this.src);
        });
    }

    async fetchBooks(url: string) {
        if (!this._user?.authenticated) {
            console.warn("User is not authenticated, cannot fetch books.");
            return;
        }
        const user = this._user as Auth.AuthenticatedUser

        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.ok) {
                const json = await response.json();
                console.log("Books");
                console.log(json);
                this.books = Array.isArray(json) ? json : json.books;
            } else {
                console.error(`Failed to fetch books: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching books from ${url}:`, error);
        }
    }

    render() {
        return html`
          <h2>
            <svg class="icon">
              <use href="/icons/books.svg#icon-love"></use>
            </svg>
            Books
          </h2>
          <ul>
            ${this.books.map(
            (book) => html`
                <li>
                  <a href="/app/books/${book._id}">${book.title}</a>
                </li>
              `
        )}
          </ul>
        `;
    }
}

