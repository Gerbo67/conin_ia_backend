"use strict";
// AssistantController.ts
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
exports.assistantController = void 0;
const responseUtils_1 = __importDefault(require("../utils/responseUtils"));
const logger_1 = __importDefault(require("../utils/logger"));
const contextRepository_1 = require("../repositories/contextRepository");
const sessionMemory_1 = require("../services/sessionMemory");
class AssistantController {
    constructor() {
        this.response = new responseUtils_1.default();
        this.QuestionAgent = this.QuestionAgent.bind(this);
    }
    QuestionAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Mensaje del usuario
                const userMessage = req.body.message;
                // sessionId (si no viene, generamos uno)
                const sessionId = (0, sessionMemory_1.getOrCreateSessionId)(req.body.sessionId);
                if (!userMessage) {
                    return this.response.invalidatedResponse({
                        res,
                        detail: 'Se requiere un mensaje para procesar la consulta'
                    });
                }
                logger_1.default.info(`AssistantController: Procesando consulta [${sessionId}]: "${userMessage}"`);
                // Llamamos a getContext con (query, topic, sessionId)
                const context = yield contextRepository_1.contextRepository.getContext(userMessage, sessionId);
                // Retornar la respuesta generada
                return this.response.correctDataResponse({
                    res,
                    data: {
                        sessionId,
                        question: context.question,
                        answer: context.answer
                    }
                });
            }
            catch (error) {
                logger_1.default.error(`AssistantController: Error en QuestionAgent: ${error.message}`);
                return this.response.errorResponse({
                    res,
                    detail: `Error procesando la consulta: ${error.message}`
                });
            }
        });
    }
}
exports.assistantController = new AssistantController();
//# sourceMappingURL=assistantController.js.map