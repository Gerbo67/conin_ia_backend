// AssistantController.ts

import e, {Request, Response} from 'express';
import ResponseUtil from '../utils/responseUtils';
import logger from '../utils/logger';
import {contextRepository} from '../repositories/contextRepository';
import {getOrCreateSessionId} from "../services/sessionMemory";

class AssistantController {
    private response: ResponseUtil;

    constructor() {
        this.response = new ResponseUtil();
        this.QuestionAgent = this.QuestionAgent.bind(this);
    }

    public async QuestionAgent(req: Request, res: Response): Promise<e.Response> {
        try {
            // Mensaje del usuario
            const userMessage = req.body.message;
            // sessionId (si no viene, generamos uno)
            const sessionId = getOrCreateSessionId(req.body.sessionId);

            if (!userMessage) {
                return this.response.invalidatedResponse({
                    res,
                    detail: 'Se requiere un mensaje para procesar la consulta'
                });
            }

            logger.info(`AssistantController: Procesando consulta [${sessionId}]: "${userMessage}"`);

            // Llamamos a getContext con (query, topic, sessionId)
            const context = await contextRepository.getContext(userMessage, sessionId);

            // Retornar la respuesta generada
            return this.response.correctDataResponse({
                res,
                data: {
                    sessionId,
                    question: context.question,
                    answer: context.answer
                }
            });

        } catch (error: any) {
            logger.error(`AssistantController: Error en QuestionAgent: ${error.message}`);
            return this.response.errorResponse({
                res,
                detail: `Error procesando la consulta: ${error.message}`
            });
        }
    }
}

export const assistantController = new AssistantController();
