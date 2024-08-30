import { Client, Collection, Events, REST } from 'discord.js';
import { Logger } from '../utils/Logger';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
    events: Collection<string, EventHandler>;
    logger: Logger
    // rest: REST
  }

  interface Command {
    data: any;
    autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
    execute(interaction: Interaction): Promise<void>;
  }

  interface EventHandler {
    event: string,
    once: boolean,
    execute(...args: any[]): void;
  }
}
