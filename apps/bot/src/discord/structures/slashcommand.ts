import DiscordBot from './client';
import { ApplicationCommandOption, CommandInteraction } from 'discord.js';

export interface SlashCommand {
	data: {
		name: string;
		description: string;
		type?: number;
		options?: ApplicationCommandOption[];
	};
	permissions?: string[];

	run(client: DiscordBot, interaction: CommandInteraction, args: any[]): any;
}
