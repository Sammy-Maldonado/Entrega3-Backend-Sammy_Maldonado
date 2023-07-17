import mongoose from 'mongoose';

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
  user: String,
  message: String
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);


export default messagesModel;