// src/config/aiConfig.ts

import {GoogleGenAI} from "@google/genai";
import logger from "../utils/logger";

class AIConfig {
    private ai: GoogleGenAI;
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.GIA || '';
        if (!this.apiKey) {
            logger.error("Google AI API KEY no encontrada en las variables de entorno");
            throw new Error("Google AI API KEY no configurada");
        }

        this.ai = new GoogleGenAI({apiKey: this.apiKey});
    }

    /**
     * Genera respuesta para una pregunta usando la IA de Google
     * @param message Mensaje enviado por el usuario
     * @returns Respuesta generada por la IA
     */
    public async generateResponse(message: string): Promise<string> {
        try {
            const response = await this.ai.models.generateContent({
                model: "gemini-2.0-flash", // Modelo más reciente de Gemini
                contents: message,
                config: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
            });

            // Manejar el caso donde text podría ser undefined
            if (!response.text) {
                throw new Error("La IA no generó una respuesta válida");
            }

            return response.text;
        } catch (error: any) {
            logger.error(`Error al generar respuesta con IA: ${error.message}`);
            throw new Error(`Error al procesar la solicitud: ${error.message}`);
        }
    }
}

// Exportamos una instancia única del servicio de IA
export const aiConfig = new AIConfig();