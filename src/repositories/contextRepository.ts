// src/repositories/contextRepository.ts
import { documentService } from '../services/documentService';
import { assistantService } from '../services/assistantService';
import logger from '../utils/logger';

// Importamos nuestras funciones de sesión en memoria
import { addMessage, getHistory } from '../services/sessionMemory';

class ContextRepository {
    /**
     * Busca y prepara el contexto relevante para una consulta en un tema,
     * generando la respuesta del agente y usando la memoria de sesiones.
     */
    public async getContext(query: string, sessionId: string): Promise<{ question: string; answer: string }> {
        try {
            // 1) Recuperar historial desde memoria
            const history = getHistory(sessionId);

            // 2) Agregar el nuevo mensaje del usuario
            addMessage(sessionId, 'user', query);

            // 3) Buscar documentos relevantes (ej. Chroma DB)
            const documents = await documentService.buscarInformacion(query, 5);
            const contextText = documents.map(doc => doc.pageContent).join('\n');

            // 4) Construir el prompt usando el historial y el contexto
            let prompt = '';

            //   4a) Incorporar los mensajes previos (usuario / asistente)
            for (const msg of history) {
                if (msg.role === 'user') {
                    prompt += `Usuario: ${msg.message}\n`;
                } else {
                    prompt += `Asistente: ${msg.message}\n`;
                }
            }

            //   4b) Añadir lo que retornaron los documentos
            prompt += `\nInformación relevante:\n${contextText}\n\n`;

            //   4c) Señalar la pregunta actual (opcional, ya está en el historial)
            prompt += `Pregunta actual: "${query}"\n`;

            // 5) Reglas o lineamientos
            const rules = `Tu concepto de agente es servir al usuario información como chatbot de ayuda, 
            usa íconos si es necesario, listarlo si se debe listar, etc.
            Si no está en los datos registrados, responde: "😊 No puedo responder nada fuera de mi propósito"
            Al final, haz una pregunta que invite a continuar.`;

            // 6) Generar la respuesta con la IA
            const answer = await assistantService.generateAnswer(`${prompt}\n${rules}`);

            // 7) Agregar la respuesta al historial
            addMessage(sessionId, 'assistant', answer);

            // 8) Retornar la pregunta y la respuesta
            return { question: query, answer };

        } catch (error: any) {
            logger.error(`ContextRepository: Error en getContext: ${error}`);
            throw new Error(`Error recuperando contexto del documento: ${error.message}`);
        }
    }
}

export const contextRepository = new ContextRepository();
