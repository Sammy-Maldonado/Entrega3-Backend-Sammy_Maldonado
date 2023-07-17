export default class UsersService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllUser = (params) => {
    return this.dao.getUsers(params);
  }

  getUserBy = (params) => {
    return this.dao.getUserBy(params);
  }

  createUser = (user) => {
    return this.dao.createUser(user);
  }

  updateUser = (id, user) => {
    return this.dao.updateUser(id, user);
  }

  deleteUser = (id) => {
    return this.dao.deleteUser(id);
  }
}