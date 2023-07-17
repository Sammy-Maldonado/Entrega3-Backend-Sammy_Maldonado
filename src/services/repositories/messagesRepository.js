export default class MessagesService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllMessages = (params) => {
    return this.dao.getMessages(params);
  }

  getMessagesByUser = (user) => {
    return this.dao.getMessagesByUser(user);
  }

  createMessage = (message) => {
    return this.dao.createMessage(message);
  }

  updateMessage = (id, message) => {
    return this.dao.updateMessage(id, message);
  }

  deleteMessage = (id) => {
    return this.dao.deleteMessage(id);
  }
}