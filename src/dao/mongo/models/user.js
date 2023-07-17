import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  password: String,
  role: {
    type: String,
    default: "user"
  },
  orders:[
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref:'Orders'
    }
  ]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const userModel = mongoose.model(collection, schema);

export default userModel;