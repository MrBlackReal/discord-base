import { Client, Collection, Events } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
    events: Collection<string, EventHandler>;
  }

  interface Command {
    data: SlashCommandBuilder;
    autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
    execute(interaction: Interaction): Promise<void>;
  }

  interface EventHandler {
    event: string,
    once: boolean,
    execute(...args: any[]): Promise<void>;
  }
}
