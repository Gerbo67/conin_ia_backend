"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const logger_1 = __importDefault(require("./utils/logger"));
const socket_io_1 = __importDefault(require("socket.io"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const responseUtils_1 = __importDefault(require("./utils/responseUtils"));
// Require
dotenv_1.default.config();
// Routes
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const assistantRoutes_1 = __importDefault(require("./routes/assistantRoutes"));
const messagesUtils_1 = require("./utils/messagesUtils");
class ServerExpress {
    // Constructor of class
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        //this.middleware();
        this.routes();
        this.httpServer = new http_1.default.Server(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer);
        this.response = new responseUtils_1.default();
    }
    // Configuration server
    config() {
        this.app.set('port', process.env.PORT || 3300);
        if (process.env.MORGAN_LOGGING === 'true') {
            this.app.use((0, morgan_1.default)('dev'));
        }
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // this.app.use(express.static(path.join(__dirname, '../docs')));
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    // Middleware to check x-api-key
    /*middleware(): void {
        const apiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
            const apiKey = req.headers['x-api-key'] as string | undefined;
            const config = await getConfig();

            if (apiKey === config.apiKeyMobil) {
                res.locals.accessType = 'mobile';
                next();
            } else if (apiKey === config.apiKeyWeb) {
                res.locals.accessType = 'web';
                next();
            } else {
                return this.response.forbiddenResponse({res: res, detail: Messages.Server.NotKey})
            }
        };

        this.app.use(apiKeyMiddleware);
    }*/
    // Set routes
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/agente', assistantRoutes_1.default);
    }
    // Start with configuration
    start() {
        this.httpServer.listen(this.app.get('port'), () => {
            logger_1.default.info(`${messagesUtils_1.Messages.Server.Success} ${this.app.get('port')}`);
        });
    }
}
const server = new ServerExpress();
server.start();
//# sourceMappingURL=index.js.map