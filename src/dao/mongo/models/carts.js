import mongoose from 'mongoose';

const cartsCollection = "carts";

/* Schema Mongo Avanzado 1*/
const cartProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  product: String,
  products: {
    type: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'products'
        },
        quantity: {
          type: Number
        }
      }
    ],
    default: [],
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

cartProductSchema.pre('find', function () {
  this.populate('products.product');
})

const cartsModel = mongoose.model(cartsCollection, cartProductSchema);


/* Schema Postman */
/* const cartProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  product: String,
  quantity: Number
});

const cartsSchema = new mongoose.Schema({
  products: [cartProductSchema]
}, {timestamps:{createdAt:'created_at', updatedAt:'updated_at'}});

const cartsModel = mongoose.model(cartsCollection, cartsSchema); */


export default cartsModel;