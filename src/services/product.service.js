import ProductManager from "../repositories/product.repository.js";

const productManager = new ProductManager();

export const createProduct = async (data) => {
  try {
    await productManager.createProduct(data);
  } catch (error) {
    throw error;
  }
}

export const readAllProducts = async () => {
  try {
    return await productManager.readAllProducts();
  } catch (error) {
    throw error;
  }
}

export const readProductById = async (productId) => {
  try {
    return await productManager.readProductById(productId);
  } catch (error) {
    throw error;
  }
}

export const updateProduct = async (productId, data) => {
  try {
    await productManager.updateProduct(productId, data);
  } catch (error) {
    throw error;
  }
}

export const deleteProduct = async (productId) => {
  try {
    await productManager.deleteProduct(productId);
  } catch (error) {
    throw error;
  }
}
