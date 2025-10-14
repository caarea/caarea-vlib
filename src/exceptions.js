// 400
export class BadRequestError extends Error {}
// 404
export class NotFoundError extends Error {}
// 419
export class AlreadyExistsError extends Error {}
// 422
export class ValidationError extends Error {
  errors

  constructor(message, errors) {
    super(message)
    this.errors = errors
  }
}
