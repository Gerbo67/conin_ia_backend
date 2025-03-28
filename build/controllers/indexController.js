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
exports.indexController = void 0;
const responseUtils_1 = __importDefault(require("../utils/responseUtils"));
const messagesUtils_1 = require("../utils/messagesUtils");
const logger_1 = __importDefault(require("../utils/logger"));
class IndexController {
    constructor() {
        this.response = new responseUtils_1.default();
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
    OK(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(messagesUtils_1.Messages.Index.Success);
                return this.response.correctResponse({
                    res: res,
                    detail: `${messagesUtils_1.Messages.Index.Success}`
                });
            }
            catch (e) {
                logger_1.default.error(messagesUtils_1.Messages.Index.Error);
                return this.response.errorResponse({ res: res, detail: messagesUtils_1.Messages.Index.Error });
            }
        });
    }
}
exports.indexController = new IndexController();
//# sourceMappingURL=indexController.js.map