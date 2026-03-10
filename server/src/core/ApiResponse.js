class ApiResponse {
  constructor(success, data, message) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  static build(success, data, message) {
    return new ApiResponse(success, data, message);
  }
}

module.exports = ApiResponse;
