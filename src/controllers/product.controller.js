import * as ProductService from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.readAllProducts();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getProductById = async (req, res) => {
  const { pid } = req.params;

  const productId = parseInt(pid);

  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: "Debe proporcionar un id válido de producto." })
  }

  try {
    const product = await ProductService.readProductById(productId);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const createProduct = async (req, res) => {
  const { body } = req;

  try {
    const newProduct = await ProductService.createProduct(body);

    res.status(201).json({ message: "Se creó exitosamente el producto.", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const { body } = req;

  const productId = parseInt(pid);

  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: "Debe proporcionar un id válido de producto." });
  }

  try {
    const updatedProduct = await ProductService.updateProduct(productId, body);

    res.status(200).json({ message: "Se actualizó exitosamente el producto.", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;

  const productId = parseInt(pid);

  if (isNaN(productId) || productId < 1) {
    return res
      .status(400)
      .json({ error: "Debe proporcionar un id válido de producto." });
  }

  try {
    const deletedProduct = await ProductService.deleteProduct(productId);

    res.status(200).json({ message: "Se borró exitosamente el producto.", deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
