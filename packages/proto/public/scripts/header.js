import { css, html, shadow, define, Dropdown, Events, Observer } from "@calpoly/mustang"
import reset from "./styles/reset.css.js"

export class HeaderElement extends HTMLElement {
    static uses = define({
        "mu-dropdown": Dropdown.Element
    });

    static template = html`
        <template>
            <header>
                <div class="left-header">
                    <h1>
                        Book Board
                    </h1>
                    <nav>
                        <a class="active" href="/index.html">Home</a>
                        <a href="/books.html">Books</a>
                        <a href="/genres.html">Genres</a>
                        <a href="/authors.html">Authors</a>
                        <a href="/years.html">Years</a>
                    </nav>
                </div>
                <mu-dropdown>
                    <a slot="actuator">
                        Hello,
                        <span id="userid"></span>
                    </a>
                    <menu>
                        <label onchange="event.stopPropagation(); toggleDarkMode(document.body, event.target.checked)">
                            <input type="checkbox"/>
                            Dark Mode
                        </label>
                        <li class="when-signed-in">
                            <a id="signout">Sign Out</a>
                        </li>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
                        </li>
                    </menu>
                </mu-dropdown>
                
            </header>
        </template>
    `;

    static styles = css`
        header {
            display: flex;
            justify-content: space-between;
            color: var(--color-text);
            background-color: var(--color-background-header);
            padding: var(--header-padding);
            font-family: var(--font-family-header);
            box-shadow: var(--shadow);
            margin-bottom: var(--header-margin-bottom);
        }
        header a {
            color: var(--color-text);
        }
        header a:hover {
            color: var(--color-hover);
        }
        .left-header {
            display: flex;
            flex-direction: column;
        }
        menu a {
            cursor: pointer;
            text-decoration: underline;
        }
        a:has(#userid:empty) ~ menu > .when-signed-in,
        a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
            display: none;
        }
    `;

    constructor() {
        super();
        shadow(this)
            .template(HeaderElement.template)
            .styles(reset.styles, HeaderElement.styles);

        this._userid = this.shadowRoot.querySelector("#userid");
        this._signout = this.shadowRoot.querySelector("#signout");

        this._signout.addEventListener("click", (event) =>
            Events.relay(event, "auth:message", ["auth/signout"])
        );
    }

    _authObserver = new Observer(this, "bb:auth");

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            if (user && user.username !== this.userid) {
                this.userid = user.username;
            }
        });
    }

    get userid() {
        return this._userid.textContent;
    }

    set userid(id) {
        if (id === "anonymous") {
            this._userid.textContent = "";
            this._signout.disabled = true;
        } else {
            this._userid.textContent = id;
            this._signout.disabled = false;
        }
    }
}