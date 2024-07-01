export class AuthorNotFound extends Error {
  constructor() {
    super('Author not found')
  }
}