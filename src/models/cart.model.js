import CartItem from "./cartItem.model.js";

export default class Cart {
  id
  #items

  constructor(items = []) {
    this.items = items;
  }

  get items() {
    return this.#items;
  }

  set items(newItems) {
    try {
      this.#items = [...newItems.map((item) => CartItem.parse(item))];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  addItem(newItem) {
    try {
      const newCartItem = CartItem.parse(newItem);

      const existingItemIndex = this.#items.findIndex((item) => item.productId === newCartItem.productId);

      if (existingItemIndex === -1) {
        this.#items.push(newCartItem);
      } else {
        this.#items[existingItemIndex].quantity += newCartItem.quantity;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  removeItem(productId) {
    try {
      const existingItemIndex = this.#items.findIndex((item) => item.productId === productId);

      if (existingItemIndex !== -1) {
        this.items = this.#items.filter((item) => item.productId !== productId);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  updateItem(productId, newPrice = null, newQuantity = null) {
    try {
      if ((newPrice && !isNaN(newPrice) && newPrice > 0) || (newQuantity && !isNaN(newQuantity) && newQuantity > 0)) {
        const existingItemIndex = this.#items.findIndex((item) => item.productId === productId);

        if (existingItemIndex !== -1) {
          if (newPrice && !isNaN(newPrice) && newPrice > 0) {
            this.#items[existingItemIndex].price = newPrice;
          }

          if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
            this.#items[existingItemIndex].quantity = newQuantity;
          }
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static parse(object) {
    if (!object.items || object.items.length === 0) {
      throw new Error("Un carrito sin items no es válido.");
    }

    try {
      return new Cart(object.items);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
