import { white, yellow, green, whiteBright, bgRed } from "cli-color";
import { Request, Response } from "express";
import { insertParams } from "./StringUtils";

export class Logger {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public info(message: string, ...params: any[]) {
        message = insertParams(message, params);
        console.log(white(`[${new Date().toLocaleTimeString()}] [${this.name}] ${message}`));
    }

    public warn(message: string, ...params: any[]) {
        message = insertParams(message, params);
        console.log(yellow(`[${new Date().toLocaleTimeString()}] [${this.name}] ${message}`));
    }

    public error(message: any, ...params: any[]) {
        message = insertParams(message, params);
        console.log(bgRed(`[${new Date().toLocaleTimeString()}] [${this.name}] ${message}`));
    }

    public traffic(req: Request, res: Response, next: any) {
        const message = green(req.method.toUpperCase()) + " " + yellow(req.protocol.toUpperCase()) + " " + whiteBright(req.originalUrl);
        console.log(message);
        
        return next();
    }
}

export default new Logger("System");