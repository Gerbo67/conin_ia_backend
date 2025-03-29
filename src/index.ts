import express, {Application, Request, Response, NextFunction} from 'express';
import compression from 'compression';
import logger from "./utils/logger";
import socketIO from 'socket.io';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import ResponseUtil from "./utils/responseUtils";

// Require
dotenv.config();

// Routes
import indexRoutes from './routes/indexRoutes';
import assistantRoutes from './routes/assistantRoutes';
import {Messages} from "./utils/messagesUtils";

class ServerExpress {

    // Public
    public app: Application;
    public io: socketIO.Server;

    // Private
    private readonly httpServer: http.Server;
    private response: ResponseUtil;

    // Constructor of class
    constructor() {
        this.app = express();
        this.config();
        //this.middleware();
        this.routes();
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer);
        this.response = new ResponseUtil();
    }

    // Configuration server
    config(): void {
        this.app.set('port', process.env.PORT || 3100);
        if (process.env.MORGAN_LOGGING === 'true') {
            this.app.use(morgan('dev'));
        }
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(express.json());
        // this.app.use(express.static(path.join(__dirname, '../docs')));
        this.app.use(express.urlencoded({extended: false}));
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
    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/agente', assistantRoutes);
    }

    // Start with configuration
    start(): void {
        this.httpServer.listen(this.app.get('port'), () => {
            logger.info(`${Messages.Server.Success} ${this.app.get('port')}`);
        });
    }
}

const server = new ServerExpress();
server.start();