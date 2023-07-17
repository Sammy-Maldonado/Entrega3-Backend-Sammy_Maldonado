import config from '../../config.js';

class RegisterUserDTO {
  constructor(user, hashedPassword) {
    this.name = `${user.first_name} ${user.last_name}`,
      this.email = user.email,
      this.age = user.age,
      this.role = user.role,
      this.password = hashedPassword

  }
}

class SuperAdminDTO {
  constructor() {
    this.id = 0,
      this.name = "Admin",
      this.email = config.admin.EMAIL,
      this.role = "superadmin"
  }
}

class PassportUserDTO {
  constructor(user) {
    this.id = user._id,
      this.name = user.name,
      this.email = user.email,
      this.role = user.role,
      this.orders = user.orders
  }
}

class GithubUserDTO {
  constructor(user) {
    this.name = user.name,
      this.email = user.email,
      this.password = ''
  }
}

class GithubTokenDTO {
  constructor(req) {
    this.id = req.user._id,
      this.name = req.user.name,
      this.role = req.user.role,
      this.email = req.user.email
  }
}

export default {
  SuperAdminDTO,
  PassportUserDTO,
  GithubUserDTO,
  GithubTokenDTO,
  RegisterUserDTO
}