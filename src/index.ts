import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
// Importar rutas
import mainRouter from "./routes";
// Importar middleware de manejo de errores
import { errorHandler } from "./middlewares/error.middleware";
// Importar configuración de Swagger
import swaggerSpec from "./config/swagger.config";

// Cargar variables de entorno desde .env
dotenv.config();

// Inicializar la aplicación Express
const app: Express = express();

// Middlewares de seguridad y utilidad
app.use(cors()); // Habilitar Cross-Origin Resource Sharing
app.use(helmet()); // Establecer cabeceras HTTP seguras
app.use(morgan("dev")); // Logger de peticiones HTTP (formato 'dev')
app.use(express.json()); // Parsear cuerpos de petición JSON
app.use(express.urlencoded({ extended: true })); // Parsear cuerpos de petición URL-encoded

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Endpoint para obtener la especificación Swagger en formato JSON
app.get("/swagger.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.send("¡API de Email Faker funcionando!");
});

// Usar el enrutador principal
app.use("/api", mainRouter);

// Middleware de manejo de errores
app.use(errorHandler);

// Puerto del servidor
// const PORT = process.env.PORT || 3000;

// Iniciar el servidor
//app.listen(PORT, () => {
//  console.log(`⚡️[server]: Servidor corriendo en http://localhost:${PORT}`);
//  console.log(`📚 Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
//});

export default app; // Exportar app para posibles pruebas
