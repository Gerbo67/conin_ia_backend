// Imports
import e, {Request, Response} from 'express';
import {exec} from 'child_process';
import * as path from "path";
import ResponseUtil from "../utils/responseUtils";
import {Messages} from "../utils/messagesUtils";
import logger from "../utils/logger";

class IndexController {
    private response: ResponseUtil;

    constructor() {
        this.response = new ResponseUtil();
        this.OK = this.OK.bind(this);
    }

    /**
     * Handles a request and sends an appropriate response.
     * Logs the success or error message based on the request handling.
     *
     * @param {Request} _req - The incoming request object.
     * @param {Response} res - The outgoing response object.
     * @return {Promise<Response>} The response object after processing the request.
     */
    public async OK(_req: Request, res: Response): Promise<e.Response> {
        try {
            logger.info(Messages.Index.Success);
            return this.response.correctResponse({
                res: res,
                detail: `${Messages.Index.Success}`
            })
        } catch (e) {
            logger.error(Messages.Index.Error);
            return this.response.errorResponse({res: res, detail: Messages.Index.Error});
        }
    }
}

export const indexController = new IndexController();