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
