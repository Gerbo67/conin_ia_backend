// src/repositories/contextRepository.ts
import { documentService } from '../services/documentService';
import { assistantService } from '../services/assistantService';
import logger from '../utils/logger';

class ContextRepository {
    /**
     * Busca y prepara el contexto relevante para una consulta específica en un tema,
     * consultando los documentos vectorizados y generando la respuesta del agente.
     * @param query Consulta del usuario.
     * @param topic Tema o colección en Chroma DB.
     * @returns Objeto con la pregunta original y la respuesta generada.
     */
    public async getContext(query: string, topic: string): Promise<{ question: string; answer: string }> {
        try {
            // Buscar documentos relevantes en la colección del tema indicado
            const documents = await documentService.buscarInformacion(query, topic, 5);

            // Unir el contenido de los documentos para generar el contexto
            const contextText = documents.map(doc => doc.pageContent).join('\n');

            // Preparar el prompt para el agente
            const prompt = `Utiliza la siguiente información:\n${contextText}\nPara responder a la consulta: "${query}"`;

            // Generar la respuesta usando el agente (Assistant Service)
            const answer = await assistantService.generateAnswer(prompt);

            return { question: query, answer };
        } catch (error: any) {
            logger.error(`ContextRepository: Error recuperando contexto: ${error}`);
            throw new Error(`Error recuperando contexto del documento: ${error.message}`);
        }
    }
}

export const contextRepository = new ContextRepository();
