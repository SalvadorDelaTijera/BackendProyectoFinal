export default class Product {
  constructor(
    title,
    description,
    code,
    price,
    status = true,
    thumbnails = []
  ) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.thumbnails = thumbnails;
  }
}