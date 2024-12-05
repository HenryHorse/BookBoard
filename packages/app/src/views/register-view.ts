import {css, html, LitElement} from "lit";
import { define } from "@calpoly/mustang";
import { RegisterForm } from "../components/register-form.ts";

export class RegisterViewElement extends LitElement {
    static uses = define({
        "register-form": RegisterForm,
    });

    render() {
        return html`
            <section>
                <main class="page">
                    <register-form api="/auth/register" redirect="/app">
                        <h3 slot="title">Sign up and get reading!</h3>
                    </register-form>
                    <p class="login">
                        Or did you want to
                        <a href="./login">
                            login
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