import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class UserAuthenticationFailed extends Error {
  statusCode: HttpStatusCode

  constructor() {
    super('Username or password does not match, try again')
    this.statusCode = HttpStatusCode.FORBIDDEN
  }
}
