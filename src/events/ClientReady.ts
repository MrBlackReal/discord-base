import { ActivityType, EventHandler, Events } from "discord.js";
import Logger from "../utils/Logger";

const presences = [
    {
        status: "online",
        activities: [
            {
                name: "some music!",
                type: ActivityType.Streaming,
                url: "https://twitch.tv/mrblackreal"
            }
        ],
        afk: false
    },
    {
        status: "online",
        activities: [
            {
                name: "Spotify",
                type: ActivityType.Listening
            }
        ],
        afk: false
    },
    {
        status: "online",
        activities: [
            {
                name: "SoundCloud",
                type: ActivityType.Listening
            }
        ],
        afk: false
    },
    {
        status: "online",
        activities: [
            {
                name: "YouTube",
                type: ActivityType.Watching
            }
        ],
        afk: false
    }
]

const event: EventHandler = {
    event: Events.ClientReady,
    once: true,
    execute(client) {
        setInterval(async () => {
            const presence = presences[Math.floor(Math.random() * presences.length)];
            client.user.setPresence(presence);
        }, 1000 * 10);

        Logger.info(`Bot Ready! Logged in as {0}`, client.user.tag)
    },
};

export default event;