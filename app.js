import e from "express";
import ProductsRouter from "./src/routers/product.router.js";

const app = e();
const PORT = 8080;

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use("/api/products", ProductsRouter);

app.listen(PORT, () => {
  console.info(`🚀 Server listening on port ${PORT}`);
});
