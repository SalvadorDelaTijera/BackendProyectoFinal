import { readFile, writeFile } from "node:fs/promises";

export default class ProductManager {
  static lastId = 0;

  constructor(path = "./products.json") {
    this.path = path;
  }

  async readAllProducts() {
    try {
      const allProducts = await readFile(this.path, { encoding: "utf-8" });

      return JSON.parse(allProducts);
    } catch (error) {
      if (error.code = 'ENOENT') {
        return [];
      } else {
        throw error;
      }
    }
  }

  async readProductById(productId) {
    try {
      const products = await this.readAllProducts();

      const data = products.find((product) => product.id === productId);

      if (!data) {
        throw new Error(`No se encontró el producto con el id ${productId}`);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveProducts(products) {
    try {
      const string = JSON.stringify(products, null, 2);

      await writeFile(this.path, string, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async createProduct(productData) {
    const newId = ProductManager.getLastId() + 1;
    
    const newProduct = {
      ...productData,
      id: newId
    };

    try {
      const products = await this.readAllProducts();

      products.push(newProduct);
      ProductManager.setLastId(newProduct.id);

      await this.saveProducts(products);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.readAllProducts();

      const product = products.find((item) => item.id === productId);

      if (!product) {
        throw new Error(`No se encontró el producto con el id ${productId}`);
      }

      const modifiedProducts = products.filter((item) => item.id !== productId);

      await this.saveProducts(modifiedProducts);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId, data) {
    try {
      const products = await this.readAllProducts();

      const productIndex = products.findIndex((item) => item.id === productId);

      if (productIndex === -1) {
        throw new Error(`No se encontró el producto con el Id ${productId}`);
      }

      const productId = products[productIndex].id;

      products.splice(productIndex, 1, { ...data, id: productId });

      await this.saveProducts(products);
    } catch (error) {
      throw error;
    }
  }

  static getLastId() {
    return ProductManager.lastId;
  }

  static setLastId(id) {
    ProductManager.lastId = id;
  }
}