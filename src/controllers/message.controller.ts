import { Request, Response, NextFunction } from 'express';
import mailService from '../services/mail.service';
import { ApiError } from '../interfaces/error.interface';

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Obtiene todos los mensajes de una cuenta
 *     description: Recupera la lista de mensajes para una cuenta específica
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página
 *     responses:
 *       200:
 *         description: Lista de mensajes obtenida con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, page = 1 } = req.query;
    
    if (!token) {
      const error: ApiError = new Error('Token de autenticación requerido');
      error.statusCode = 400;
      throw error;
    }
    
    const messages = await mailService.getMessages(token as string, Number(page));
    
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Obtiene un mensaje específico
 *     description: Recupera un mensaje por su ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mensaje
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *     responses:
 *       200:
 *         description: Mensaje obtenido con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Mensaje no encontrado
 *       500:
 *         description: Error del servidor
 */
export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    
    if (!token) {
      const error: ApiError = new Error('Token de autenticación requerido');
      error.statusCode = 400;
      throw error;
    }
    
    const message = await mailService.getMessage(token as string, id);
    
    // Marcar el mensaje como leído automáticamente
    await mailService.markAsRead(token as string, id);
    
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Elimina un mensaje
 *     description: Elimina un mensaje por su ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del mensaje
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación
 *     responses:
 *       204:
 *         description: Mensaje eliminado con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Mensaje no encontrado
 *       500:
 *         description: Error del servidor
 */
export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    
    if (!token) {
      const error: ApiError = new Error('Token de autenticación requerido');
      error.statusCode = 400;
      throw error;
    }
    
    await mailService.deleteMessage(token as string, id);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};