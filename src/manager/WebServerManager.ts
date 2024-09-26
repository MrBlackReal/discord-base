import { Client } from "discord.js";
import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import path from "node:path";
import Logger from "../utils/Logger";

class WebServerManager {
    private app = express();
    private port = process.env.PORT || 1337;

    private setupRoutes(client: Client) {
        const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
    
        this.app.use(express.static(path.join(__dirname, '../../public')));
        this.app.use(limiter)

        this.app.post('/bot/status', async (req: Request, res: Response) => {
            if (client.token != null) {
                return res.send("Running");
            }
            else {
                return res.send("Stopped");
            }
        });

        this.app.post('/bot/start', async (req: Request, res: Response) => {
            if (client.token != null)
                return res.send("Already Running");

            await client.login(process.env.BOT_TOKEN);
            return res.send('Bot gestartet');
        });

        this.app.post('/bot/stop', async (req: Request, res: Response) => {
            if (client) {
                if (client.user) {
                    client.user.setPresence({ status: "invisible" });
                }

                client.destroy();
                return res.send('Stopped');
            } else {
                return res.send('Already Stopped');
            }
        });
    }

    public start(client: Client) {
        this.setupRoutes(client);
        this.app.listen(this.port, () => Logger.info(`Running Web Server -> http://localhost:{0}`, this.port));
    }
}

export default new WebServerManager();