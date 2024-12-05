export default {
    server: {
        proxy: {
            "/api": "http://localhost:3000",
            "/auth": "http://localhost:3000",
            "/images": "http://localhost:3000",
            "/books/:id": "http://localhost:3000",
        }
    }
};