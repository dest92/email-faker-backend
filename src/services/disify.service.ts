import axios from 'axios';
import { DisifyResponse } from '../interfaces/disify.interface';

class DisifyService {
  private baseUrl: string = 'https://www.disify.com/api/email';

  /**
   * Verifica si un email es válido usando Disify
   */
  async verifyEmail(email: string): Promise<DisifyResponse> {
    try {
      const params = new URLSearchParams();
      params.append('email', email);

      const response = await axios.post(this.baseUrl, params);
      return response.data;
    } catch (error) {
      console.error('Error al verificar email:', error);
      throw new Error('No se pudo verificar el email');
    }
  }

  /**
   * Determina si un email es válido según los criterios de Disify
   */
  isEmailValid(response: DisifyResponse): boolean {
    // Un email es válido si:
    // - Tiene formato correcto
    // - Tiene DNS válido
    // - Es entregable
    // - No es spam
    return response.format && response.dns && response.deliverable && !response.spam;
  }
}

export default new DisifyService();