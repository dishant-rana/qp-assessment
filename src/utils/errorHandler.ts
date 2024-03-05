import logger from '../utils/logger';

type Resp = {
  code: number;
  message: string;
  errorType?: string;
  error?: string;
};

export class ApiError extends Error {
  statusCode: string;

  code: number;

  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (error, req, res) => {
  logger.error(error);
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      type: 'failure',
      code: error.code,
      message: error.message,
      error: error.message,
    });
  }
  const resp: Resp = {
    code: 500,
    message: 'Oops! Something went wrong, please try again later',
  };
  return res.status(500).json(resp);
};
