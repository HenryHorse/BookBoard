import { css } from "lit";

export default css`
    .page {
        display: grid;
        grid-template-areas:
                    "page-title page-title page-title"
                    "authors genres years"
                    "description description description";
    }

    .description {
        grid-area: description;
    }

    .page ul {
        grid-template-columns: var(--page-column-split);
    }

    @media (max-width: 480px) {
        .page {
            grid-template-areas:
                        "page-title"
                        "authors"
                        "genres"
                        "years"
                        "description";
        }

        .page ul {
            grid-template-columns: 1fr;
        }
    }
`;

