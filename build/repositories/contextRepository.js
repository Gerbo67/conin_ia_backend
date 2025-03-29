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
class ContextRepository {
    /**
     * Busca y prepara el contexto relevante para una consulta específica en un tema,
     * consultando los documentos vectorizados y generando la respuesta del agente.
     * @param query Consulta del usuario.
     * @param topic Tema o colección en Chroma DB.
     * @returns Objeto con la pregunta original y la respuesta generada.
     */
    getContext(query, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar documentos relevantes en la colección del tema indicado
                const documents = yield documentService_1.documentService.buscarInformacion(query, topic, 5);
                // Unir el contenido de los documentos para generar el contexto
                const contextText = documents.map(doc => doc.pageContent).join('\n');
                // Preparar el prompt para el agente
                const prompt = `Utiliza la siguiente información:\n${contextText}\nPara responder a la consulta: "${query}"`;
                // Generar la respuesta usando el agente (Assistant Service)
                const answer = yield assistantService_1.assistantService.generateAnswer(prompt);
                return { question: query, answer };
            }
            catch (error) {
                logger_1.default.error(`ContextRepository: Error recuperando contexto: ${error}`);
                throw new Error(`Error recuperando contexto del documento: ${error.message}`);
            }
        });
    }
}
exports.contextRepository = new ContextRepository();
//# sourceMappingURL=contextRepository.js.map