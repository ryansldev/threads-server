export class UserAuthenticationFailed extends Error {
  constructor() {
    super('Username or password does not match, try again')
  }
}
