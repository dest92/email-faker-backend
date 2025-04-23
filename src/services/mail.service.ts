import axios from 'axios';
import { Domain, Account, AuthToken, Message, MessageList } from '../interfaces/mail.interface';

class MailService {
  private baseUrl: string = 'https://api.mail.tm';

  /**
   * Obtiene los dominios disponibles para crear cuentas
   */
  async getDomains(): Promise<Domain[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/domains`);
      return response.data['hydra:member'];
    } catch (error) {
      console.error('Error al obtener dominios:', error);
      throw new Error('No se pudieron obtener los dominios disponibles');
    }
  }

  /**
   * Crea una cuenta de email temporal
   */
  async createAccount(username: string, domain: string, password: string): Promise<Account> {
    const address = `${username}@${domain}`;
    try {
      const response = await axios.post(`${this.baseUrl}/accounts`, {
        address,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      throw new Error('No se pudo crear la cuenta de email temporal');
    }
  }

  /**
   * Obtiene un token de autenticación
   */
  async getToken(address: string, password: string): Promise<AuthToken> {
    try {
      const response = await axios.post(`${this.baseUrl}/token`, {
        address,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener token:', error);
      throw new Error('No se pudo obtener el token de autenticación');
    }
  }

  /**
   * Obtiene todos los mensajes de una cuenta
   */
  async getMessages(token: string, page: number = 1): Promise<MessageList> {
    try {
      const response = await axios.get(`${this.baseUrl}/messages?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
      throw new Error('No se pudieron obtener los mensajes');
    }
  }

  /**
   * Obtiene un mensaje específico por su ID
   */
  async getMessage(token: string, messageId: string): Promise<Message> {
    try {
      const response = await axios.get(`${this.baseUrl}/messages/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener mensaje:', error);
      throw new Error('No se pudo obtener el mensaje');
    }
  }

  /**
   * Marca un mensaje como leído
   */
  async markAsRead(token: string, messageId: string): Promise<Message> {
    try {
      const response = await axios.patch(
        `${this.baseUrl}/messages/${messageId}`,
        { seen: true },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al marcar mensaje como leído:', error);
      throw new Error('No se pudo marcar el mensaje como leído');
    }
  }

  /**
   * Elimina un mensaje
   */
  async deleteMessage(token: string, messageId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/messages/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      throw new Error('No se pudo eliminar el mensaje');
    }
  }

  /**
   * Genera un nombre de usuario aleatorio
   */
  generateRandomUsername(length: number = 10): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Genera una contraseña aleatoria
   */
  generateRandomPassword(length: number = 12): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Maneja errores de la API
   * @param error Error de axios
   */
  private handleApiError(error: any): never {
    console.error('Error en la API:', error);
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        throw new Error('No autorizado. El token puede haber expirado.');
      } else if (status === 404) {
        throw new Error('Recurso no encontrado.');
      }
    }
    throw new Error('Error al comunicarse con el servicio de Mail.tm');
  }

  /**
   * Obtiene información de una cuenta específica
   * @param token Token de autenticación
   * @returns Información de la cuenta
   */
  async getAccount(token: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/accounts/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Obtiene información de la cuenta autenticada
   * @param token Token de autenticación
   * @returns Información de la cuenta
   */
  async getMe(token: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Elimina una cuenta
   * @param token Token de autenticación
   */
  async deleteAccount(token: string) {
    try {
      await axios.delete(`${this.baseUrl}/accounts/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      this.handleApiError(error);
    }
  }
}

export default new MailService();