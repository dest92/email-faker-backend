import { Request, Response, NextFunction } from 'express';
import mailService from '../services/mail.service';
import disifyService from '../services/disify.service';
import { VerifiedEmail } from '../interfaces/mail.interface';
import { ApiError } from '../interfaces/error.interface';

/**
 * @swagger
 * /api/email:
 *   post:
 *     summary: Crea un email temporal verificado
 *     description: Genera un email temporal utilizando Mail.tm y verifica su validez con Disify
 *     tags: [Email]
 *     responses:
 *       201:
 *         $ref: '#/components/responses/SuccessResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *       503:
 *         description: Servicio no disponible
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const createVerifiedEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obtener dominios disponibles
    const domains = await mailService.getDomains();
    if (!domains.length) {
      const error: ApiError = new Error('No hay dominios disponibles');
      error.statusCode = 503;
      throw error;
    }

    console.log('Dominios disponibles:', domains);

    // Intentar crear cuentas hasta encontrar una válida
    let verifiedEmail: VerifiedEmail | null = null;
    let lastGeneratedEmail: VerifiedEmail | null = null;
    let attempts = 0;
    const maxAttempts = 5;

    while (!verifiedEmail && attempts < maxAttempts) {
      attempts++;
      
      // Seleccionar un dominio aleatorio en lugar del primero
      const randomIndex = Math.floor(Math.random() * domains.length);
      const domain = domains[randomIndex].domain;
      
      // Generar credenciales aleatorias
      const username = mailService.generateRandomUsername();
      const password = mailService.generateRandomPassword();
      const email = `${username}@${domain}`;

      try {
        // Verificar el email con Disify antes de crearlo
        const disifyResult = await disifyService.verifyEmail(email);
        
        // Crear la cuenta independientemente del resultado de la verificación
        const account = await mailService.createAccount(username, domain, password);
        const authToken = await mailService.getToken(email, password);
        
        // Guardar la información del último email generado
        lastGeneratedEmail = {
          email: account.address,
          password: password,
          token: authToken.token,
          isVerified: disifyService.isEmailValid(disifyResult)
        };
        
        // Si el email es válido según Disify, lo marcamos como verificado
        if (disifyService.isEmailValid(disifyResult)) {
          verifiedEmail = lastGeneratedEmail;
        }
      } catch (error) {
        console.error('Error al procesar email:', error);
        // Continuar con el siguiente intento
      }
    }

    // Si no se pudo verificar ningún email pero tenemos uno generado, lo devolvemos igualmente
    const emailToReturn = verifiedEmail || lastGeneratedEmail;
    
    if (!emailToReturn) {
      const error: ApiError = new Error('No se pudo crear un email después de varios intentos');
      error.statusCode = 500;
      throw error;
    }

    // Devolver la respuesta con el email generado, indicando si fue verificado o no
    res.status(201).json({
      success: !!verifiedEmail, // true si se verificó, false si no
      data: emailToReturn,
      domains: domains, // Incluir la lista de dominios disponibles
      attempts: attempts // Incluir el número de intentos realizados
    });
  } catch (error) {
    next(error);
  }
};