import messagesModel from "../models/messages.js";

export default class MessagesManager {
  getMessages = (params) => {
    return messagesModel.find(params).lean();
  }

  getMessagesByUser = (user) => {
    return messagesModel.findOne(user);
  }

  createMessage = (message) => {
    return messagesModel.create(message);
  }

  updateMessage = (id, message) => {
    return messagesModel.findByIdAndUpdate(id, {$set:message});
  }

  deleteMessage = (id) => {
    return messagesModel.findByIdAndDelete(id);
  }
}