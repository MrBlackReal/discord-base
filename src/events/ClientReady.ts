import { ActivityType, AnySelectMenuInteraction, Client, EventHandler, Events, PresenceData } from "discord.js";
import Logger from "../utils/Logger";

const presences: PresenceData[] = [
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

let presenceTimer: any;

export function startPresenceUpdateTimer(client: Client) {
    if (!presenceTimer) {
        presenceTimer = setInterval(async () => {
            if (!client || !client.user)
                return;

            const presence = presences[Math.floor(Math.random() * presences.length)];
            client.user.setPresence(presence);
        }, 1000 * 10);
    }
}

export function stopPresenceUpdateTimer() {
    if (presenceTimer) {
        clearInterval(presenceTimer);
        presenceTimer = null;
    }
}

const event: EventHandler = {
    event: Events.ClientReady,
    once: true,
    execute(client) {
        startPresenceUpdateTimer(client);

        Logger.info(`Bot Ready! Logged in as {0}`, client.user.tag)
    },
};

export default event;