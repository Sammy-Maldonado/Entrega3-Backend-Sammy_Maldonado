import mongoose from "mongoose";

const collection = "Tickets";

const schema = new mongoose.Schema({
    code: {
      type: String,
      unique: true,
      default:function(){
        //Generando un código aleatorio
        return Math.floor(Math.random() * 99999999);
      },
    },
    purchase_datetime: {
      type: Date,
      default: Date.now,
    },
    amount: Number,
    purchaser: String,
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const userModel = mongoose.model(collection, schema);

export default userModel;