import e from "express";
import ProductsRouter from "./src/routers/product.router.js";
import CartsRouter from "./src/routers/cart.router.js";

const app = e();

// Middlewares de la app
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

export default app;
