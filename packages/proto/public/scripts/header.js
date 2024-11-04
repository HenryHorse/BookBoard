import { css, html, shadow } from "@calpoly/mustang"
import reset from "./styles/reset.css.js"

export class HeaderElement extends HTMLElement {
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
                <label onchange="event.stopPropagation(); toggleDarkMode(document.body, event.target.checked)">
                    <input type="checkbox"/>
                    Dark Mode
                </label>
                <div class="login">
                    <a href="">Login</a>
                </div>
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
        .login {
            display: flex;
            font-family: var(--font-family-login);
            background-color: var(--color-background-login);
            padding: var(--login-padding);
            box-shadow: var(--shadow);
        }
    `;

    constructor() {
        super();
        shadow(this)
            .template(HeaderElement.template)
            .styles(reset.styles, HeaderElement.styles);
    }
}