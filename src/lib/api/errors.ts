// Custom API Errors
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends APIError {
  constructor(message = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}