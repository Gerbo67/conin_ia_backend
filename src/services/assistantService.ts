import { aiConfig } from '../config/aiConfig';
import logger from '../utils/logger';

class AssistantService {
    /**
     * Envía un prompt al modelo de IA (Gemini) y retorna la respuesta generada.
     * @param prompt Mensaje o prompt con el contexto y la consulta.
     * @returns Respuesta generada por la IA.
     */
    public async generateAnswer(prompt: string): Promise<string> {
        try {
            const answer = await aiConfig.generateResponse(prompt);
            return answer;
        } catch (error: any) {
            logger.error(`AssistantService: Error generando respuesta: ${error.message}`);
            throw new Error(`Error generando respuesta: ${error.message}`);
        }
    }
}

export const assistantService = new AssistantService();
