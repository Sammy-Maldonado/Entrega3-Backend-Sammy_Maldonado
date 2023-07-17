import mongoose from "mongoose";

const collection = "Orders";

const schema = new mongoose.Schema({
  number: Number,
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Carts'
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Users'
  },
  status: String,
  products: [],
  totalPrice: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const orderModel = mongoose.model(collection, schema);

export default orderModel;