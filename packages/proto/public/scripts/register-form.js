import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class RegisterForm extends HTMLElement {
    static template = html`
    <template>
        <form>
            <slot name="title">
                <h3>Sign up with Username and Password</h3>
            </slot>
            <label>
                <span>
                    <slot name="username">Username</slot>
                </span>
                <input name="username" autocomplete="off" />
            </label>
            <label>
                <span>
                    <slot name="password">Password</slot>
                </span>
                <input type="password" name="password" />
            </label>
            <label>
                <span>
                    <slot name="confirm-password">Confirm Password</slot>
                </span>
                <input type="password" name="confirm-password" />
            </label>
            <slot name="submit">
                <button type="submit">Sign Up</button>
            </slot>
        </form>
    </template>
  `;

    static styles = css`
        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        label {
            display: flex;
            flex-direction: column;
        }
        input {
            padding: var(--login-padding);
            font-size: var(--login-font-size);
        }
        button {
            padding: var(--login-padding);
            font-size: var(--login-font-size);
        }
  `;

    constructor() {
        super();

        shadow(this)
            .template(RegisterForm.template)
            .styles(reset.styles, RegisterForm.styles);

        this.form.addEventListener("submit", (event) =>
            submitRegisterForm(
                event,
                this.getAttribute("api"),
                this.getAttribute("redirect") || "/"
            )
        );
    }

    get form() {
        return this.shadowRoot.querySelector("form");
    }
}

function submitRegisterForm(event, endpoint, redirect) {
    event.preventDefault();
    const form = event.target.closest("form");
    const data = new FormData(form);

    if (data.get("password") !== data.get("confirm-password")) {
        console.error("Passwords do not match");
        return;
    }

    const method = "POST";
    const headers = {
        "Content-Type": "application/json"
    };
    const body = JSON.stringify(Object.fromEntries(data));

    fetch(endpoint, { method, headers, body })
        .then((res) => {
            if (res.status !== 201)
                throw `Form submission failed: Status ${res.status}`;
            return res.json();
        })
        .then((payload) => {
            const { token } = payload;

            form.dispatchEvent(
                new CustomEvent("auth:message", {
                    bubbles: true,
                    composed: true,
                    detail: ["auth/signin", { token, redirect }]
                })
            );
        })
        .catch((err) => console.log("Error submitting form:", err));
}