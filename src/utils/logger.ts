import toString from 'lodash/toString';
import winston from 'winston';
import 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

type TLogMetadata = Record<string, unknown>;

type TMsgLevel = (typeof EMsgLevel)[keyof typeof EMsgLevel];
export enum EMsgLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  DEBUG = 'debug'
}
export enum EMsgCode {
  // Server
  SERVER_I_0001 = 'SERVER-I-001',
  SERVER_I_0002 = 'SERVER-I-002'
}

const msgInfos = new Map<EMsgCode, [TMsgLevel, string]>([
  // Server
  [EMsgCode.SERVER_I_0001, [EMsgLevel.INFO, '⚡️[server]: Server is running on port {{port}} and {{env}} mode']],
  [EMsgCode.SERVER_I_0002, [EMsgLevel.INFO, '⚡️[server]: Start failed']]
]);
class Logger {
  private logger: winston.Logger;

  private logFormat: winston.Logform.Format;

  private logTransports: winston.transport[];

  constructor() {
    this.logFormat = winston.format.combine(
      winston.format.combine(winston.format.colorize()),
      // timestamp format
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      // log format
      winston.format.printf(({ level, message, timestamp, stack }) => {
        let str = `[${timestamp}]::[${level}]`;

        if (message) {
          str += `::${message}`;
        }

        if (stack) {
          str += `\n${stack}`;
        }

        return str;
      })
    );

    this.logTransports = [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: 'logs/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d'
      }),
      new winston.transports.DailyRotateFile({
        level: 'error',
        filename: 'logs/%DATE%.error.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d'
      })
    ];

    this.logger = winston.createLogger({
      format: this.logFormat,
      transports: this.logTransports,
      levels,
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    });
    this.logger.child({ requestId: 'abc' });
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public debug(message: string, metadata: TLogMetadata) {
    this.logger.debug(this.withMetadata(message, metadata, true));
  }

  public logMsg(msgCode: EMsgCode, metadata?: TLogMetadata, logMetadata = true) {
    const msgInfo = msgInfos.get(msgCode);

    if (!msgInfo) {
      return;
    }

    const [level, message] = msgInfo;

    this.logger.log(level, this.withMetadata(`${msgCode}::${message}`, metadata, logMetadata));
  }

  public logMsgWithError(msgCode: EMsgCode, error: unknown, metadata?: TLogMetadata) {
    const msgInfo = msgInfos.get(msgCode);

    if (!msgInfo || !(error instanceof Error)) {
      return;
    }

    const [, message] = msgInfo;

    this.logger.error(this.withMetadata(`${msgCode}::${message} -`, metadata), error);
  }

  public getMessage(msgId: EMsgCode): string {
    const [, message] = msgInfos.get(msgId) ?? [];

    return message ?? '';
  }

  private withMetadata(message: string, metadata?: TLogMetadata, logMetadata?: boolean): string {
    if (!metadata) {
      return message;
    }

    message = message.replace(/{{(\w+)}}/g, (match, key) => toString(metadata[key]) || match);

    if (!logMetadata) {
      return message;
    }

    return message + `\n-- Metadata: ${JSON.stringify(metadata, null, 2)}`;
  }
}

const logger = new Logger();
export default logger;
