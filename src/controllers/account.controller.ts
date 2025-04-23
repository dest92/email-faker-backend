import { Request, Response, NextFunction } from 'express';
import mailService from '../services/mail.service';
import { ApiError } from '../interfaces/error.interface';

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Obtiene información de la cuenta
 *     description: Recupera los detalles de una cuenta específica usando el token de autenticación
 *     tags: [Account]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: Información de la cuenta obtenida con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
export const getAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      const error: ApiError = new Error('Token de autenticación requerido');
      error.statusCode = 400;
      throw error;
    }
    
    const account = await mailService.getAccount(token as string);
    
    res.status(200).json({
      success: true,
      data: account
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/account:
 *   delete:
 *     summary: Elimina una cuenta
 *     description: Elimina permanentemente una cuenta y todos sus mensajes
 *     tags: [Account]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *     responses:
 *       204:
 *         description: Cuenta eliminada con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cuenta no encontrada
 *       500:
 *         description: Error del servidor
 */
export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      const error: ApiError = new Error('Token de autenticación requerido');
      error.statusCode = 400;
      throw error;
    }
    
    await mailService.deleteAccount(token as string);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/account/me:
 *   get:
 *     summary: Obtiene información de la cuenta actual
 *     description: Recupera los detalles de la cuenta autenticada
 *     tags: [Account]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: Información de la cuenta obtenida con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      const error: ApiError = new Error('Token de autenticación requerido');
      error.statusCode = 400;
      throw error;
    }
    
    const me = await mailService.getMe(token as string);
    
    res.status(200).json({
      success: true,
      data: me
    });
  } catch (error) {
    next(error);
  }
};