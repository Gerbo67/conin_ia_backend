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
exports.assistantController = void 0;
const responseUtils_1 = __importDefault(require("../utils/responseUtils"));
const logger_1 = __importDefault(require("../utils/logger"));
const contextRepository_1 = require("../repositories/contextRepository");
class AssistantController {
    constructor() {
        this.response = new responseUtils_1.default();
        this.QuestionAgent = this.QuestionAgent.bind(this);
    }
    /**
     * Único método para manejar preguntas del usuario
     * Detecta el tema de la consulta y responde con información relevante
     */
    QuestionAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener el mensaje del usuario
                const userMessage = req.body.message;
                if (!userMessage) {
                    return this.response.invalidatedResponse({
                        res: res,
                        detail: 'Se requiere un mensaje para procesar la consulta'
                    });
                }
                logger_1.default.info(`AssistantController: Procesando consulta: "${userMessage}"`);
                // Define el tema a consultar; en este ejemplo se utiliza "seguridad"
                const topic = "seguridad";
                // Consultar el repository para obtener el contexto y la respuesta del agente
                const context = yield contextRepository_1.contextRepository.getContext(userMessage, topic);
                // Retornar la respuesta generada
                return this.response.correctDataResponse({
                    res: res,
                    data: {
                        question: context.question,
                        answer: context.answer
                    }
                });
            }
            catch (error) {
                logger_1.default.error(`AssistantController: Error en QuestionAgent: ${error.message}`);
                return this.response.errorResponse({
                    res: res,
                    detail: `Error procesando la consulta: ${error.message}`
                });
            }
        });
    }
}
exports.assistantController = new AssistantController();
//# sourceMappingURL=assistantController.js.map