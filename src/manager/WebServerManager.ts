import { ShardingManager } from "discord.js";
import express, { Request, Response } from "express";
import path from "node:path";
import { Logger } from "../utils/Logger";
import { startPresenceUpdateTimer, stopPresenceUpdateTimer } from "../events/ClientReady";

class WebServerManager {

    private readonly app = express();
    private readonly logger = new Logger("Web Socket");

    private setupRoutes(manager: ShardingManager) {
        this.app.use(express.static(path.join(__dirname, '../../public')));

        this.app.post('/bot/status', async (req: Request, res: Response) => {
            return res.send("status")
        });

        this.app.post('/bot/start', async (req: Request, res: Response) => {
            return res.send("start")
        });

        this.app.post('/bot/stop', async (req: Request, res: Response) => {
            return res.send("stop")
        });
    }

    public start(manager: ShardingManager, port: number) {
        /*this.setupRoutes(manager);
        
        try {
            this.app.listen(port, () => this.logger.info(`Running Web Server -> http://localhost:{0}`, port));
        } catch (error) {
            console.error(error);
        }*/

        this.setupRoutes(manager);

        const attemptListen = (port: number) => {
            this.app.listen(port, () => {
                this.logger.info(`Running Web Server -> http://localhost:${port}`);
            }).on('error', (err: NodeJS.ErrnoException) => {
                if (err.code === 'EADDRINUSE') {
                    this.logger.error(`Port ${port} is already in use. Trying another port...`);
                    attemptListen(port + 1);  // Try the next port
                } else {
                    console.error(err);
                }
            });
        };

        attemptListen(port);
    }
}

export default new WebServerManager();