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
            const rules = `Tu función es ser un ChatBot oficial del Gobierno de Finanzas de Querétaro para informar a la ciudadanía.
            - Siempre responde con amabilidad y, de ser necesario, emplea emojis para reforzar tu mensaje.
            - Usa únicamente la información que esté dentro de tu registro de datos: si algo no está disponible, contesta con: "😊 No puedo responder nada fuera de mi propósito".
            - Ante palabras inapropiadas o faltas de ortografía graves, responde con: "Lo siento, no entendí 😢".
            - Ofrece respuestas breves y claras; si es necesario, distingue si el trámite es estatal o municipal.
            - Al final de cada respuesta, formula una pregunta que invite a continuar la conversación.
            - No inventes ni proporciones datos que no existan en tu registro. Percibe que cada mensaje nuevo que envias no debe
            empezar saludando si identificas que ya tiene el usuario historial conversacional, esto lo sabras si este mensaje tiene
            anexado el texto "Usuario: " o "Asistente: ".`;

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
