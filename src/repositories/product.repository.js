import { readFile, writeFile } from "node:fs/promises";
import Product from "../models/product.model.js";

export default class ProductManager {
  static INITIAL_LAST_ID = 0;

  #lastId;
  #products = [];

  constructor(path = "./src/repositories/products.json") {
    this.path = path;
  }

  async loadFile() {
    try {
      const reader = await readFile(this.path, { encoding: "utf-8" });
      if (reader) {
        const file = JSON.parse(reader);

        this.#lastId = file?.lastId || ProductManager.INITIAL_LAST_ID;
        this.#products = file?.products || [];
      } else {
        this.#lastId = ProductManager.INITIAL_LAST_ID;
        this.#products = [];
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        this.#lastId = ProductManager.INITIAL_LAST_ID;
        this.#products = [];
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async saveFile() {
    try {
      const file = {
        lastId: this.#lastId,
        products: this.#products,
      };

      const writter = JSON.stringify(file, null, 2);

      await writeFile(this.path, writter, { encoding: "utf-8" });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readAllProducts() {
    try {
      await this.loadFile();

      return this.#products;
    } catch (error) {
      if ((error.code = "ENOENT")) {
        return [];
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  async readProductById(productId) {
    try {
      await this.loadFile();

      const data = this.#products.find((product) => product.id === productId);

      if (!data) {
        throw new Error(`No se encontró el producto con el id ${productId}`);
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async saveProducts(products) {
    try {
      const newProducts = products.map((product) => Product.parse(product));
      const maxId = Math.max(...newProducts.map((product) => product.id));
      this.#products = [...newProducts];
      this.#lastId = maxId;

      await this.saveFile();

      return newProducts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      let retVal;
      const newProduct = Product.parse(productData);

      await this.loadFile();
      const existingProduct = this.#products.find(
        (product) => product.code === newProduct.code
      );

      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity;
        retVal = existingProduct;
      } else {
        newProduct.id = ++this.#lastId;
        this.#products.push(newProduct);
        retVal = newProduct;
      }

      await this.saveFile();

      return retVal;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      await this.loadFile();

      const existingProductIndex = this.#products.findIndex(
        (product) => product.id === productId
      );

      if (existingProductIndex === -1) {
        throw new Error(`No se encontró el producto con el Id ${productId}.`);
      }

      const retVal = this.#products[existingProductIndex];
      this.#products = this.#products.filter(
        (product) => product.id !== productId
      );

      await this.saveFile();

      return retVal;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(productId, data) {
    try {
      await this.loadFile();

      const existingProductIndex = this.#products.findIndex(
        (product) => product.id === productId
      );

      if (existingProductIndex === -1) {
        throw new Error(`No se encontró el producto con el Id ${productId}.`);
      }

      const updatedData = Product.parse(data);
      this.#products[existingProductIndex] = {
        ...updatedData,
        id: productId,
      };

      await this.saveFile();

      return this.#products[existingProductIndex];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getLastId() {
    return this.#lastId;
  }
}