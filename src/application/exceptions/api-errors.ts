import { HttpStatusCode } from "../../types/enums/http-status-code";
import { BaseError } from "./base-error";

export class APIError extends BaseError {
  constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, description = 'internal server error') {
    super(name, httpCode, description);
  }
}

export class BadRequestError extends BaseError {
  constructor(description = 'bad request') {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(description = 'unauthorized request') {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, description)
  }
}

export class ForbiddenError extends BaseError {
  constructor(description = 'forbidden request') {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, description)
  }
}

export class NotFoundError extends BaseError {
  constructor(description = 'not found request') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, description);
  }
}
