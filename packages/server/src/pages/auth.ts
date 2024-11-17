import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage"; // generic page renderer

export class LoginPage {
    render() {
        return renderPage({
            scripts: [
                `
        import { define, Auth } from "@calpoly/mustang";
        import { LoginForm } from "/scripts/login-form.js";
        import { HeaderElement } from "/scripts/header.js";

        define({
          "mu-auth": Auth.Provider,
          "bb-header": HeaderElement,
          "login-form": LoginForm
        })
        `
            ],
            styles: [
                css`
                    
        `
            ],
            body: html`
        <body>
            <mu-auth provides="bb:auth">
                <article>
                    <bb-header></bb-header>
                
                    <section>
                        <main class="page">
                            <login-form api="/auth/login">
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
                </article>
            </mu-auth>
        </body>
      `
        });
    }
}

export class RegisterPage {
    render() {
        return renderPage({
            scripts: [
                `
        import { define, Auth } from "@calpoly/mustang";
        import { RegisterForm } from "/scripts/register-form.js";
        import { HeaderElement } from "/scripts/header.js";

        define({
          "mu-auth": Auth.Provider,
          "bb-header": HeaderElement,
          "register-form": RegisterForm
        })
        `
            ],
            styles: [
                css`
                    
        `
            ],
            body: html`
        <body>
            <mu-auth provides="bb:auth">
                <article>
                    <bb-header></bb-header>
                
                    <section>
                        <main class="page">
                            <register-form api="/auth/register">
                                <h3 slot="title">Sign up and get reading!</h3>
                            </register-form>
                        </main>
                    </section>
                </article>
            </mu-auth>
        </body>
      `
        });
    }
}