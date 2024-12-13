import { css } from "lit";

export default css`
    .page {
        display: grid;
        grid-template-areas:
            "books books"
            "genres authors";
    }
    @media (max-width: 480px) {
        .page {
            grid-template-areas:
                "books"
                "genres"
                "authors";
        }
        .page ul {
            grid-template-columns: 1fr;
        }
    }


`;

