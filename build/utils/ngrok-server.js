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
const ngrok_1 = __importDefault(require("ngrok"));
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno
dotenv_1.default.config();
const PORT = process.env.PORT || 3100;
function startNgrok() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicia ngrok apuntando al puerto donde se ejecuta tu API
            const url = yield ngrok_1.default.connect({
                addr: PORT,
                // Puedes añadir tu token de autenticación si tienes una cuenta en ngrok
                // authtoken: process.env.NGROK_AUTH_TOKEN,
            });
            logger_1.default.info(`🚀 API expuesta públicamente en: ${url}`);
            logger_1.default.info('Esta URL estará activa mientras mantengas este proceso en ejecución');
            logger_1.default.info('Presiona Ctrl+C para detener ngrok');
        }
        catch (error) {
            logger_1.default.error('Error al iniciar ngrok:', error);
        }
    });
}
// Iniciar ngrok
startNgrok();
//# sourceMappingURL=ngrok-server.js.map