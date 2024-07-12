import e from "express";
import ProductsRouter from "./src/routers/product.router.js";

const app = e();

// Middlewares de la app
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", ProductsRouter);

export default app;
