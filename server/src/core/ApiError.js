class ApiError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(message);
    this.status = 404;
  }
}

class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error") {
    super(message);
    this.status = 500;
  }
}

class AuthenticationError extends ApiError {
  constructor(message = "Authentication Error") {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  AuthenticationError,
};
