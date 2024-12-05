import {Dropdown, define, Events, Observer, Auth} from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";

export class BBHeaderElement extends LitElement {
    @state() userid: string = "";

    static uses = define({
        "drop-down": Dropdown.Element
    });

    _authObserver = new Observer<Auth.Model>(this, "bb:auth");

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe(({ user }) => {
            if (user && user.authenticated && user.username !== this.userid) {
                this.userid = user.username;
            }
            else {
                this.userid = "";
            }
        });
    }

    render() {
        return html`
            <header>
                <div class="left-header">
                    <h1>
                        Book Board
                    </h1>
                    <nav>
                        <a class="active" href="/app">Home</a>
                        <a href="/app/books">Books</a>
                        <a href="/app/genres">Genres</a>
                        <a href="/app/authors">Authors</a>
                        <a href="/app/years">Years</a>
                    </nav>
                </div>
                <drop-down>
                    <a slot="actuator">
                        Hello,
                        <span id="userid">${this.userid}</span>
                    </a>
                    <menu>
                        <label @change=${toggleDarkMode}>
                            <input type="checkbox" autocomplete="off"/>
                            Dark Mode
                        </label>
                        <li class="when-signed-in">
                            <a id="signout" @click=${this.handleSignOut}>Sign Out</a>
                        </li>
                        <li class="when-signed-out">
                            <a href="/app/login">Sign In</a>
                        </li>
                    </menu>
                </drop-down>

            </header>
    `;
    }


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


    handleSignOut(event: MouseEvent) {
        Events.relay(event, "auth:message", ["auth/signout"])
    }
}



type Checkbox = HTMLInputElement & { checked: boolean };

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as Checkbox;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}


