import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: {
    type: Number,
    index: true
  },
  code: String,
  stock: Number,
  category: {
    type: String,
    index: true
  },
  status: Boolean,
  thumbnails: {
    type: [],
    default: []
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productsCollection, productsSchema);


export default productsModel;