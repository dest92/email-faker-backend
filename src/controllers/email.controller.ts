import { Request, Response, NextFunction } from "express";
import mailService from "../services/mail.service";
import disifyService from "../services/disify.service";
import fakerService from "../services/faker.service";
import { VerifiedEmail } from "../interfaces/mail.interface";
import { ApiError } from "../interfaces/error.interface";

/**
 * @swagger
 * /api/email:
 *   post:
 *     summary: Crea un email temporal verificado
 *     description: Genera un email temporal utilizando Mail.tm y verifica su validez con Disify. También genera un perfil de usuario aleatorio.
 *     tags: [Email]
 *     responses:
 *       201:
 *         description: Email temporal creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 disposableDetected:
 *                   type: boolean
 *                   description: Indica si el email es desechable (true) o ha sido verificado como válido (false)
 *                   example: false
 *                 data:
 *                   $ref: '#/components/schemas/VerifiedEmail'
 *                 userProfile:
 *                   $ref: '#/components/schemas/UserProfile'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *       503:
 *         description: Servicio no disponible
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const createVerifiedEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtener dominios disponibles
    const domains = await mailService.getDomains();
    if (!domains.length) {
      const error: ApiError = new Error("No hay dominios disponibles");
      error.statusCode = 503;
      throw error;
    }

    console.log("Dominios disponibles:", domains);

    // Generar perfil de usuario aleatorio
    const userProfile = fakerService.generateUserProfile();

    // Seleccionar un dominio aleatorio
    const randomIndex = Math.floor(Math.random() * domains.length);
    const domain = domains[randomIndex].domain;

    // Generar credenciales usando el nombre de Faker
    const username = userProfile.fullName
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");
    const password = mailService.generateRandomPassword();
    const email = `${username}@${domain}`;

    let verifiedEmail: VerifiedEmail | null = null;

    try {
      const account = await mailService.createAccount(
        username,
        domain,
        password
      );
      const disifyResult = await disifyService.verifyEmail(email);
      const authToken = await mailService.getToken(email, password);

      // Guardar la información del email generado
      verifiedEmail = {
        email: account.address,
        password: password,
        token: authToken.token,
        isVerified: disifyService.isEmailValid(disifyResult),
      };
    } catch (error) {
      console.error("Error al procesar email:", error);
      const apiError: ApiError = new Error("No se pudo crear el email");
      apiError.statusCode = 500;
      throw apiError;
    }

    // Devolver la respuesta con el email generado, indicando si fue verificado o no
    res.status(201).json({
      disposableDetected: !verifiedEmail.isVerified,
      data: verifiedEmail,
      userProfile: userProfile,
    });
  } catch (error) {
    next(error);
  }
};
