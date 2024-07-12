export default class CartItem {
  #productId;
  #price;
  #quantity;

  constructor(productId, price, quantity = 1) {
    this.#productId = productId;
    this.#price = price;
    this.#quantity = quantity;
  }

  get productId() {
    return this.#productId;
  }

  get subtotal() {
    return this.#price * this.#quantity;
  }

  get price() {
    return this.#price;
  }

  set price(newPrice) {
    if (isNaN(newPrice) || newPrice < 0) {
      throw new Error("Debes proporcionar un precio válido.");
    }

    this.#price = newPrice;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(newQuantity) {
    if (isNaN(newQuantity) || newQuantity < 1) {
      throw new Error("Debe proporcionar una cantidad válida.");
    }

    this.#quantity = newQuantity;
  }

  static parse(object) {
    if (!object.productId || isNaN(object.productId) || object.productId < 1) {
      throw new Error("Debe proporcionar un \'productId\' válido.");
    }

    if (!object.price || isNaN(object.price) || object.price <= 0) {
      throw new Error("Debe proporcionar un \'price\' válido.");
    }

    return new CartItem(
      object.productId,
      object.price,
      object?.quantity || 1
    );
  }
}
