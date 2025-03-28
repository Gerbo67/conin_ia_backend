import e, {Request, Response} from 'express';
import ResponseUtil from '../utils/responseUtils';
import logger from "../utils/logger"
import {Messages} from "../utils/messagesUtils";


class AssistantController {
    private response: ResponseUtil;

    constructor() {
        this.response = new ResponseUtil();
    }

    public async QuestionAgent(req: Request, res: Response): Promise<e.Response> {
        try {
            logger.info(Messages.Index.Success);
            return this.response.correctResponse({
                res: res,
                detail: `${Messages.Index.Success} - ${res.locals.accessType}`
            })
        } catch (e) {
            logger.error(Messages.Index.Error);
            return this.response.errorResponse({res: res, detail: Messages.Index.Error});
        }
    }
}

export const assistantController = new AssistantController();