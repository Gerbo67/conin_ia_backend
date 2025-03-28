"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const isProduction = process.env.TYPE_ENV === 'production';
// Configuration of logger
const config = {
    level: isProduction ? 'silent' : 'debug',
    prettifier: pino_pretty_1.default,
};
// Create instance of logger
const logger = (0, pino_1.default)(config, (0, pino_pretty_1.default)());
exports.default = logger;
//# sourceMappingURL=logger.js.map