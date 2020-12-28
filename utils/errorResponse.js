class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message, statusCode);
      this.message = message;
      this.statusCode = statusCode;
    }
  }
  
  export default ErrorResponse;
  