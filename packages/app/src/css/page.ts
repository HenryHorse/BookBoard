import { css } from "lit";

export default css`
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

    .page-title {
        background-color: var(--color-title);
        border-color: var(--color-title);
        padding: var(--title-padding);
        font-size: var(--title-font-size);
        margin: auto auto;
        grid-area: page-title;

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

    section h2 {
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }

    body {
        background-color: var(--color-background-page);
    }

    svg.icon {
        display: inline;
        height: var(--icon-height);
        width: var(--icon-width);
        vertical-align: bottom;
        fill: currentColor;
    }

    .active {
        color: var(--color-active-nav);
    }

    .genres {
        grid-area: genres;
    }

    .authors {
        grid-area: authors;
    }

    .books {
        grid-area: books;
    }

    .years {
        grid-area: years;
    }

    .author {
        grid-area: author;
    }

    .year {
        grid-area: year;
    }

    .genre {
        grid-area: genre;
    }

    .page {
        row-gap: var(--section-row-gap);
        column-gap: var(--section-column-gap);
    }

    .page ul {
        display: grid;
        grid-template-columns: var(--home-column-split);
        gap: var(--list-gap);
    }

    @media (max-width: 480px) {
        .page {
            grid-template-columns: 1fr;
        }

        .page ul {
            grid-template-columns: 1fr;
        }
    }
`;

