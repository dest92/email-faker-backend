import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../interfaces/error.interface';

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Error interno del servidor',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};