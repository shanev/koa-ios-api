/**
 * Generic error for all client errors with status code 400.
 * This should be used for all user errors, i.e: when the client
 * does something wrong. 500 should only be reserved for server
 * failures.
 */
class ClientError extends Error {
  constructor(message = 'Generic client error.', status = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = ClientError;
