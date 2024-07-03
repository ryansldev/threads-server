import { HttpStatusCode } from "../../types/enums/http-status-code";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;
  
  constructor(name: string, httpCode: HttpStatusCode, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    
    this.name = name;
    this.httpCode = httpCode;
  }
}