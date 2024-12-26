export class SupabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export class ConnectionError extends SupabaseError {
  constructor(message = 'Failed to connect to database') {
    super(message);
    this.name = 'ConnectionError';
  }
}

export class DataError extends SupabaseError {
  constructor(message = 'Data operation failed') {
    super(message);
    this.name = 'DataError';
  }
}