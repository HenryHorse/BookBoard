import { css } from "lit";

export default css`
    .page {
        display: grid;
        grid-template-areas:
            "page-title page-title page-title page-title page-title"
            "books books books genres years";
    }

    .page ul {
        grid-template-columns: var(--page-column-split);
    }

    @media (max-width: 480px) {
        .page {
            grid-template-areas:
                "page-title"
                "books"
                "genres"
                "years";
        }

        .page ul {
            grid-template-columns: 1fr;
        }
    }



`;

