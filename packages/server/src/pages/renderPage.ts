import {
    PageParts,
    renderWithDefaults
} from "@calpoly/mustang/server";

const defaults = {
    stylesheets: [
        "/css/reset.css",
        "/css/tokens.css",
        "/css/page.css"
    ],
    styles: [],
    googleFontURL:
        "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    imports: {
        "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
    }
};

export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, defaults);
}