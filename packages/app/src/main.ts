import { Auth, History, Switch, define, Store } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model"
import update from "./update";
import { BBHeaderElement } from "./components/bb-header";
import { HomeViewElement } from "./views/home-view";
import { LoginViewElement } from "./views/login-view";
import {RegisterViewElement} from "./views/register-view.ts";
import {BookViewElement} from "./views/book-view.ts";
import {GenreListElement} from "./components/genre-list.ts";
import {BookListElement} from "./components/book-list.ts";
import {AuthorListElement} from "./components/author-list.ts";
import {YearListElement} from "./components/year-list.ts";
import {GenreViewElement} from "./views/genre-view.ts";
import {AllBooksViewElement} from "./views/all-books-view.ts";
import {AllYearsViewElement} from "./views/all-years-view.ts";
import {AllAuthorsViewElement} from "./views/all-authors-view.ts";
import {AllGenresViewElement} from "./views/all-genres-view.ts";
import {AuthorViewElement} from "./views/author-view.ts";
import {YearViewElement} from "./views/year-view.ts";



const routes = [
    {
        path: "/app/books/:bookid",
        view: (params: Switch.Params) => html`
          <book-view bookid=${params.bookid}></book-view>
        `
    },
    {
        path: "/app/books",
        view: () => html`
          <all-books-view></all-books-view>
        `
    },
    {
        path: "/app/genres/:genreid",
        view: (params: Switch.Params) => html`
            <genre-view genreid=${params.genreid}></genre-view>
        `
    },
    {
        path: "/app/genres",
        view: () => html`
          <all-genres-view></all-genres-view>
        `
    },
    {
        path: "/app/years/:yearid",
        view: (params: Switch.Params) => html`
          <year-view yearid=${params.yearid}></year-view>
        `
    },
    {
        path: "/app/years",
        view: () => html`
          <all-years-view></all-years-view>
        `
    },
    {
        path: "/app/authors/:authorid",
        view: (params: Switch.Params) => html`
          <author-view authorid=${params.authorid}></author-view>
        `
    },
    {
        path: "/app/authors",
        view: () => html`
          <all-authors-view></all-authors-view>
        `
    },
    {
        path: "/app",
        view: () => html`
          <home-view></home-view>
        `
    },
    {
        path: "/",
        redirect: "/app"
    },
    {
        path: "/app/login",
        view: () => html`
            <login-view></login-view>
        `
    },
    {
        path: "/app/register",
        view: () => html`
            <register-view></register-view>
        `
    }
];

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "bb:history", "bb:auth")
        }
    },
    "mu-store": class AppStore extends Store.Provider<Model, Msg> {
        constructor() {
            super(update, init, "bb:auth");
        }
    },
    "bb-header": BBHeaderElement,
    "genre-list": GenreListElement,
    "book-list": BookListElement,
    "author-list": AuthorListElement,
    "year-list": YearListElement,
    "login-view": LoginViewElement,
    "register-view": RegisterViewElement,
    "home-view": HomeViewElement,
    "book-view": BookViewElement,
    "genre-view": GenreViewElement,
    "author-view": AuthorViewElement,
    "year-view": YearViewElement,
    "all-books-view": AllBooksViewElement,
    "all-years-view": AllYearsViewElement,
    "all-authors-view": AllAuthorsViewElement,
    "all-genres-view": AllGenresViewElement
});