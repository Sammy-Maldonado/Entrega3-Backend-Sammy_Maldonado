import { messagesService } from "../services/index.js";

const registerChatHandler = (io, socket) => {

  const saveMessage = async(message) => {
    await messagesService.createMessage(message);
    const messageLogs = await messagesService.getAllMessages();
    io.emit('chat:messageLogs', messageLogs);
  }

  const newParticipant = (user) => {
    socket.broadcast.emit('chat:newConnection', user);
  }

  socket.on('chat:message', saveMessage);
  socket.on('chat:newParticipant', newParticipant);
}

export default registerChatHandler;