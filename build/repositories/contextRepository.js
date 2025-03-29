"use strict";
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
exports.contextRepository = void 0;
// src/repositories/contextRepository.ts
const documentService_1 = require("../services/documentService");
const assistantService_1 = require("../services/assistantService");
const logger_1 = __importDefault(require("../utils/logger"));
// Importamos nuestras funciones de sesión en memoria
const sessionMemory_1 = require("../services/sessionMemory");
class ContextRepository {
    /**
     * Busca y prepara el contexto relevante para una consulta en un tema,
     * generando la respuesta del agente y usando la memoria de sesiones.
     */
    getContext(query, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 1) Recuperar historial desde memoria
                const history = (0, sessionMemory_1.getHistory)(sessionId);
                // 2) Agregar el nuevo mensaje del usuario
                (0, sessionMemory_1.addMessage)(sessionId, 'user', query);
                // 3) Buscar documentos relevantes (ej. Chroma DB)
                const documents = yield documentService_1.documentService.buscarInformacion(query, 5);
                const contextText = documents.map(doc => doc.pageContent).join('\n');
                // 4) Construir el prompt usando el historial y el contexto
                let prompt = '';
                //   4a) Incorporar los mensajes previos (usuario / asistente)
                for (const msg of history) {
                    if (msg.role === 'user') {
                        prompt += `Usuario: ${msg.message}\n`;
                    }
                    else {
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
                const answer = yield assistantService_1.assistantService.generateAnswer(`${prompt}\n${rules}`);
                // 7) Agregar la respuesta al historial
                (0, sessionMemory_1.addMessage)(sessionId, 'assistant', answer);
                // 8) Retornar la pregunta y la respuesta
                return { question: query, answer };
            }
            catch (error) {
                logger_1.default.error(`ContextRepository: Error en getContext: ${error}`);
                throw new Error(`Error recuperando contexto del documento: ${error.message}`);
            }
        });
    }
}
exports.contextRepository = new ContextRepository();
//# sourceMappingURL=contextRepository.js.map