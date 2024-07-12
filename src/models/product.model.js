export default class Product {
  constructor(
    title,
    description,
    code,
    price,
    quantity,
    status = true,
    thumbnails = []
  ) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
    this.thumbnails = thumbnails;
  }

  static parse(object) {
    if (!object.title || object.title.length === 0) {
      throw new Error("Debes proporcionar un \'title\' válido.");
    }

    if (!object.description || object.description.length === 0) {
      throw new Error("Debes proporcionar una \'description\' válida.");
    }
    
    if (!object.code || object.code.length === 0) {
      throw new Error("Debes proporcionar un \'code\' válido.");
    }

    if (!object.price || isNaN(object.price) || object.price <= 0) {
      throw new Error("Debes proporcionar un \'price\' válido.");
    }

    if (!object.quantity || isNaN(object.quantity) || object.quantity <= 0) {
      throw new Error("Debes proporcionar una \'quantity\' válida.");
    }

    return new Product(
      object.title,
      object.description,
      object.code,
      object.price,
      object.quantity,
      object?.status || true,
      object?.thumbnails || []
    );
  }
}