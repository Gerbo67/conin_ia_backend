"use strict";
// src/config/aiConfig.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiConfig = void 0;
const genai_1 = require("@google/genai");
const logger_1 = __importDefault(require("../utils/logger"));
class AIConfig {
    constructor() {
        this.apiKey = process.env.GIA || '';
        if (!this.apiKey) {
            logger_1.default.error("Google AI API KEY no encontrada en las variables de entorno");
            throw new Error("Google AI API KEY no configurada");
        }
        this.ai = new genai_1.GoogleGenAI({ apiKey: this.apiKey });
    }
    /**
     * Genera respuesta para una pregunta usando la IA de Google
     * @param message Mensaje enviado por el usuario
     * @returns Respuesta generada por la IA
     */
    generateResponse(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.ai.models.generateContent({
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
            }
            catch (error) {
                logger_1.default.error(`Error al generar respuesta con IA: ${error.message}`);
                throw new Error(`Error al procesar la solicitud: ${error.message}`);
            }
        });
    }
}
// Exportamos una instancia única del servicio de IA
exports.aiConfig = new AIConfig();
//# sourceMappingURL=aiConfig.js.map