import { Client, Collection } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }

  interface Command {
    data: SlashCommandBuilder;
    autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
    execute(interaction: Interaction): Promise<void>;
  }
}
