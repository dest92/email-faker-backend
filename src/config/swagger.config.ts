import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Email Faker',
    version: '1.0.0',
    description: 'API para generar emails temporales verificados usando Mail.tm y Disify',
    contact: {
      name: 'Soporte API',
      email: 'soporte@emailfaker.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo'
    }
  ],
  tags: [
    {
      name: 'Email',
      description: 'Operaciones relacionadas con emails temporales'
    }
  ],
  components: {
    schemas: {
      VerifiedEmail: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'Dirección de email temporal generada',
            example: 'usuario123@dominio.com'
          },
          password: {
            type: 'string',
            description: 'Contraseña generada para el email',
            example: 'P@ssw0rd123!'
          },
          token: {
            type: 'string',
            description: 'Token de autenticación para acceder a los mensajes',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          },
          isVerified: {
            type: 'boolean',
            description: 'Indica si el email ha pasado la verificación de Disify',
            example: true
          }
        },
        required: ['email', 'password', 'token', 'isVerified']
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          error: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Error interno del servidor'
              },
              stack: {
                type: 'string',
                example: 'Error: Error interno del servidor\n    at ...'
              }
            }
          }
        }
      },
      Message: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único del mensaje'
          },
          accountId: {
            type: 'string',
            description: 'ID de la cuenta a la que pertenece el mensaje'
          },
          msgid: {
            type: 'string',
            description: 'ID del mensaje en formato de correo electrónico'
          },
          from: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                description: 'Dirección de correo del remitente'
              },
              name: {
                type: 'string',
                description: 'Nombre del remitente'
              }
            }
          },
          to: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'Dirección de correo del destinatario'
                },
                name: {
                  type: 'string',
                  description: 'Nombre del destinatario'
                }
              }
            }
          },
          subject: {
            type: 'string',
            description: 'Asunto del mensaje'
          },
          intro: {
            type: 'string',
            description: 'Introducción o resumen del mensaje'
          },
          text: {
            type: 'string',
            description: 'Contenido del mensaje en formato texto'
          },
          html: {
            type: 'string',
            description: 'Contenido del mensaje en formato HTML'
          },
          hasAttachments: {
            type: 'boolean',
            description: 'Indica si el mensaje tiene archivos adjuntos'
          },
          attachments: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Attachment'
            }
          },
          size: {
            type: 'number',
            description: 'Tamaño del mensaje en bytes'
          },
          downloadUrl: {
            type: 'string',
            description: 'URL para descargar el mensaje completo'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha y hora de creación del mensaje'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha y hora de última actualización del mensaje'
          },
          isDeleted: {
            type: 'boolean',
            description: 'Indica si el mensaje ha sido eliminado'
          },
          isRead: {
            type: 'boolean',
            description: 'Indica si el mensaje ha sido leído'
          }
        }
      },
      Attachment: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único del archivo adjunto'
          },
          filename: {
            type: 'string',
            description: 'Nombre del archivo'
          },
          contentType: {
            type: 'string',
            description: 'Tipo de contenido MIME'
          },
          disposition: {
            type: 'string',
            description: 'Disposición del archivo (inline o attachment)'
          },
          transferEncoding: {
            type: 'string',
            description: 'Codificación de transferencia'
          },
          related: {
            type: 'boolean',
            description: 'Indica si el archivo está relacionado con el contenido HTML'
          },
          size: {
            type: 'number',
            description: 'Tamaño del archivo en bytes'
          },
          downloadUrl: {
            type: 'string',
            description: 'URL para descargar el archivo'
          }
        }
      },
      MessageList: {
        type: 'object',
        properties: {
          'hydra:member': {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Message'
            }
          },
          'hydra:totalItems': {
            type: 'number',
            description: 'Número total de mensajes'
          }
        }
      }
    },
    responses: {
      UserProfile: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'Nombre de la persona'
          },
          lastName: {
            type: 'string',
            description: 'Apellido de la persona'
          },
          fullName: {
            type: 'string',
            description: 'Nombre completo'
          },
          gender: {
            type: 'string',
            description: 'Género'
          },
          age: {
            type: 'number',
            description: 'Edad'
          },
          birthdate: {
            type: 'string',
            description: 'Fecha de nacimiento'
          },
          avatar: {
            type: 'string',
            description: 'URL del avatar'
          },
          address: {
            type: 'object',
            properties: {
              street: {
                type: 'string',
                description: 'Dirección'
              },
              city: {
                type: 'string',
                description: 'Ciudad'
              },
              state: {
                type: 'string',
                description: 'Estado o provincia'
              },
              zipCode: {
                type: 'string',
                description: 'Código postal'
              },
              country: {
                type: 'string',
                description: 'País'
              }
            }
          },
          phone: {
            type: 'string',
            description: 'Número de teléfono'
          },
          occupation: {
            type: 'string',
            description: 'Ocupación o profesión'
          },
          company: {
            type: 'string',
            description: 'Empresa'
          }
        }
      },
      SuccessResponse: {
        description: 'Operación exitosa',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                disposableDetected: {
                  type: 'boolean',
                  example: false,
                  description: 'Indica si se detectó que el email es desechable'
                },
                data: {
                  $ref: '#/components/schemas/VerifiedEmail'
                },
                userProfile: {
                  $ref: '#/components/schemas/UserProfile'
                },
                domains: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Domain'
                  }
                },
                attempts: {
                  type: 'number',
                  example: 1,
                  description: 'Número de intentos realizados'
                }
              }
            }
          }
        }
      },
      ErrorResponse: {
        description: 'Error en la operación',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export default swaggerJSDoc(options);