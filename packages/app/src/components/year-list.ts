import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class YearListElement extends LitElement {
    @property() src?: string; // URL to fetch years
    @state() years: Array<{ _id: string; year: string }> = [];
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
            if (this.src) this.fetchYears(this.src);
        });
    }

    async fetchYears(url: string) {
        if (!this._user?.authenticated) {
            console.warn("User is not authenticated, cannot fetch years.");
            return;
        }
        const user = this._user as Auth.AuthenticatedUser

        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.ok) {
                const json = await response.json();
                this.years = Array.isArray(json) ? json : (json.years || [json.publicationYear]);
            } else {
                console.error(`Failed to fetch years: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching years from ${url}:`, error);
        }
    }

    render() {
        return html`
          <h2>
            <svg class="icon">
              <use href="/icons/books.svg#icon-love"></use>
            </svg>
            Years
          </h2>
          <ul>
            ${this.years.map(
            (year) => html`
                <li>
                  <a href="/app/years/${year._id}">${year.year}</a>
                </li>
              `
        )}
          </ul>
        `;
    }
}

