class CreateOrderDTO {
  constructor(orderNumber, cart, user, actualProducts, totalPrice) {
    this.number = orderNumber;
    this.cart = cart;
    this.user = user;
    this.status = "pending";
    this.products = actualProducts.map((product) => ({
      title: product.title,
      price: product.price,
    }));
    this.totalPrice = totalPrice;
  }
}

export default {
  CreateOrderDTO,
}