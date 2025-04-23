import { Router } from 'express';
import { createVerifiedEmail } from '../controllers/email.controller';
import { getMessages, getMessage, deleteMessage } from '../controllers/message.controller';
import { getAccount, deleteAccount, getMe } from '../controllers/account.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Operaciones relacionadas con emails temporales
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Operaciones relacionadas con mensajes de email
 */

/**
 * @swagger
 * /api/email:
 *   post:
 *     summary: Crea un email temporal verificado
 *     tags: [Email]
 *     responses:
 *       201:
 *         description: Email temporal creado exitosamente
 *       500:
 *         description: Error del servidor
 *       503:
 *         description: Servicio no disponible
 */
router.post('/email', createVerifiedEmail);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Obtiene todos los mensajes
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de mensajes obtenida exitosamente
 *       400:
 *         description: Token no proporcionado
 *       500:
 *         description: Error del servidor
 */
router.get('/messages', getMessages);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Obtiene un mensaje específico
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensaje obtenido exitosamente
 *       400:
 *         description: Token no proporcionado
 *       404:
 *         description: Mensaje no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/messages/:id', getMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Elimina un mensaje
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Mensaje eliminado exitosamente
 *       400:
 *         description: Token no proporcionado
 *       404:
 *         description: Mensaje no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/messages/:id', deleteMessage);

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Operaciones relacionadas con cuentas de email
 */

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Obtiene información de la cuenta
 *     tags: [Account]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información de la cuenta obtenida exitosamente
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/account', getAccount);

/**
 * @swagger
 * /api/account:
 *   delete:
 *     summary: Elimina una cuenta
 *     tags: [Account]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cuenta eliminada exitosamente
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.delete('/account', deleteAccount);

/**
 * @swagger
 * /api/account/me:
 *   get:
 *     summary: Obtiene información de la cuenta actual
 *     tags: [Account]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información de la cuenta obtenida exitosamente
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/account/me', getMe);

export default router;