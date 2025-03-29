import express, {Application} from 'express';
import compression from 'compression';
import logger from "./utils/logger";
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

    // Private
    private readonly httpServer: http.Server;
    private response: ResponseUtil;

    // Constructor of class
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.httpServer = new http.Server(this.app);
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