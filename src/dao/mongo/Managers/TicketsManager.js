import ticketModel from "../models/ticket.js";

export default class TicketsManager {
  getTickets = (params) => {
    return ticketModel.find(params).lean();
  }

  getTicketBy = (params) => {
    return ticketModel.findOne(params).lean();
  }

  createTicket = (ticket) => {
    return ticketModel.create(ticket);
  }

  updateTicket = (id, ticket) => {
    return ticketModel.findByIdAndUpdate(id, {$set:ticket});
  }

  deleteTicket = (id) => {
    return ticketModel.findByIdAndDelete(id);
  }
}