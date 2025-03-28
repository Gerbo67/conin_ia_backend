import e, {Request, Response} from 'express';
import ResponseUtil from '../utils/responseUtils';
import logger from "../utils/logger";
import {Messages} from "../utils/messagesUtils";
import {aiConfig} from "../config/aiConfig";

class AssistantController {
    private response: ResponseUtil;

    constructor() {
        this.response = new ResponseUtil();
        // Vinculamos el método al contexto de la clase para mantener 'this'
        this.QuestionAgent = this.QuestionAgent.bind(this);
    }

    public async QuestionAgent(req: Request, res: Response): Promise<e.Response> {
        try {
            logger.info('Procesando pregunta del usuario');

            // Verificar si hay un mensaje en la solicitud
            const userMessage = req.body.message;
            if (!userMessage) {
                return this.response.invalidatedResponse({
                    res: res,
                    detail: 'Se requiere un mensaje para procesar la solicitud'
                });
            }

            // Procesar el mensaje con la IA
            const aiResponse = await aiConfig.generateResponse(userMessage);

            // Devolver la respuesta generada
            return this.response.correctDataResponse({
                res: res,
                data: {
                    question: userMessage,
                    answer: aiResponse
                }
            });

        } catch (error: any) {
            logger.error(`Error en QuestionAgent: ${error.message}`);
            return this.response.errorResponse({
                res: res,
                detail: `Error al procesar la pregunta: ${error.message}`
            });
        }
    }
}

export const assistantController = new AssistantController();