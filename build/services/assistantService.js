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
exports.assistantService = void 0;
const aiConfig_1 = require("../config/aiConfig");
const logger_1 = __importDefault(require("../utils/logger"));
class AssistantService {
    /**
     * Envía un prompt al modelo de IA (Gemini) y retorna la respuesta generada.
     * @param prompt Mensaje o prompt con el contexto y la consulta.
     * @returns Respuesta generada por la IA.
     */
    generateAnswer(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answer = yield aiConfig_1.aiConfig.generateResponse(prompt);
                return answer;
            }
            catch (error) {
                logger_1.default.error(`AssistantService: Error generando respuesta: ${error.message}`);
                throw new Error(`Error generando respuesta: ${error.message}`);
            }
        });
    }
}
exports.assistantService = new AssistantService();
//# sourceMappingURL=assistantService.js.map