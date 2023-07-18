const generateTicketCode = () => {
    const randomNumber = Math.floor(Math.random() * 99999999);
    return randomNumber.toString();
  };
  
  const calculateTotalAmount = (cart) => {
    let totalAmount = 0;
  
    for (const item of cart.products) {
      const product = item.product;
      const quantityInCart = item.quantity;
      const productPrice = product.price;
      totalAmount += quantityInCart * productPrice;
    }
    return totalAmount;
  };

  class CreateTicketDTO {
    constructor(cart) {
      this.code = generateTicketCode(),
        this.purchase_datetime = new Date(),
        this.amount = calculateTotalAmount(cart),
        this.purchaser = cart.email
    }
  }

  export default {
    CreateTicketDTO
  }