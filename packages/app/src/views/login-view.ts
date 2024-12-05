import {css, html, LitElement} from "lit";
import { define } from "@calpoly/mustang";
import { LoginForm } from "../components/login-form.ts";

export class LoginViewElement extends LitElement {
    static uses = define({
        "login-form": LoginForm,
    });

    render() {
        return html`
            <section>
                <main class="page">
                    <login-form api="/auth/login" redirect="/app">
                        <h3 slot="title">Sign in and get reading!</h3>
                    </login-form>
                    <p class="register">
                        Or did you want to
                        <a href="./register">
                            register as a new user
                        </a>
                        ?
                    </p>
                </main>
            </section>
        `
    }

    static styles = css`
        section {
            color: var(--color-text);
            background-color: var(--color-background-section);
            border-style: var(--style-border-section);
            border-color: var(--color-border-section);
            padding: var(--section-padding);
            font-family: var(--font-family-section);
            border-radius: var(--section-border-radius);
            box-shadow: var(--shadow);

        }
        section a {
            color: var(--color-text);
        }
        section a:hover {
            color: var(--color-hover);
        }
    `
}