import pino from 'pino';
import pinoPretty from 'pino-pretty';

const isProduction = process.env.TYPE_ENV === 'production';

// Configuration of logger
const config = {
    level: isProduction ? 'silent' : 'debug',
    prettifier: pinoPretty,
};

// Create instance of logger
const logger = pino(config, pinoPretty());

export default logger;