import e, {Request, Response} from 'express';
import ResponseUtil from '../utils/responseUtils';
import logger from "../utils/logger";
import {contextRepository} from '../repositories/contextRepository';

class AssistantController {
    private response: ResponseUtil;

    constructor() {
        this.response = new ResponseUtil();
        this.QuestionAgent = this.QuestionAgent.bind(this);
    }

    /**
     * Único método para manejar preguntas del usuario
     * Detecta el tema de la consulta y responde con información relevante
     */
    public async QuestionAgent(req: Request, res: Response): Promise<e.Response> {
        try {
            // Obtener el mensaje del usuario
            const userMessage = req.body.message;

            if (!userMessage) {
                return this.response.invalidatedResponse({
                    res: res,
                    detail: 'Se requiere un mensaje para procesar la consulta'
                });
            }

            logger.info(`AssistantController: Procesando consulta: "${userMessage}"`);

            // Define el tema a consultar; en este ejemplo se utiliza "seguridad"
            const topic = "seguridad";

            // Consultar el repository para obtener el contexto y la respuesta del agente
            const context = await contextRepository.getContext(userMessage, topic);

            // Retornar la respuesta generada
            return this.response.correctDataResponse({
                res: res,
                data: {
                    question: context.question,
                    answer: context.answer
                }
            });

        } catch (error: any) {
            logger.error(`AssistantController: Error en QuestionAgent: ${error.message}`);
            return this.response.errorResponse({
                res: res,
                detail: `Error procesando la consulta: ${error.message}`
            });
        }
    }
}

export const assistantController = new AssistantController();