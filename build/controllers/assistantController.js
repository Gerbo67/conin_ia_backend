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
const aiConfig_1 = require("../config/aiConfig");
class AssistantController {
    constructor() {
        this.response = new responseUtils_1.default();
        // Vinculamos el método al contexto de la clase para mantener 'this'
        this.QuestionAgent = this.QuestionAgent.bind(this);
    }
    QuestionAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Procesando pregunta del usuario');
                // Verificar si hay un mensaje en la solicitud
                const userMessage = req.body.message;
                if (!userMessage) {
                    return this.response.invalidatedResponse({
                        res: res,
                        detail: 'Se requiere un mensaje para procesar la solicitud'
                    });
                }
                // Procesar el mensaje con la IA
                const aiResponse = yield aiConfig_1.aiConfig.generateResponse(userMessage);
                // Devolver la respuesta generada
                return this.response.correctDataResponse({
                    res: res,
                    data: {
                        question: userMessage,
                        answer: aiResponse
                    }
                });
            }
            catch (error) {
                logger_1.default.error(`Error en QuestionAgent: ${error.message}`);
                return this.response.errorResponse({
                    res: res,
                    detail: `Error al procesar la pregunta: ${error.message}`
                });
            }
        });
    }
}
exports.assistantController = new AssistantController();
//# sourceMappingURL=assistantController.js.map