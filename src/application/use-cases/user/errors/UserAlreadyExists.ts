import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class UserAlreadyExists extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('User already exists')
    this.statusCode = HttpStatusCode.BAD_REQUEST
  }
}