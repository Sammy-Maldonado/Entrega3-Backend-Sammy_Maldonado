export default class TicketsService {
    constructor(dao) {
      this.dao = dao;
    }
  
    getAllTickets = (params) => {
      return this.dao.getTickets(params);
    }
  
    getTicketBy = (params) => {
      return this.dao.getTicketBy(params);
    }
  
    createTicket = (ticket) => {
      return this.dao.createTicket(ticket);
    }
  
    updateTicket = (id, ticket) => {
      return this.dao.updateTicket(id, ticket);
    }
  
    deleteTicket = (id) => {
      return this.dao.deleteTicket(id);
    }
  }