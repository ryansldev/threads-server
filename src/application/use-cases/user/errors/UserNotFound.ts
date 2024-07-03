import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class UserNotFound extends Error {
  statusCode: HttpStatusCode

  constructor() {
    super('User not found')
    this.statusCode = HttpStatusCode.NOT_FOUND
  }
}