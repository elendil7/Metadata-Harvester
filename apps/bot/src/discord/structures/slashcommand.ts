import DiscordBot from './client';
import {
	ApplicationCommandOption,
	ApplicationCommandType,
	CommandInteraction,
} from 'discord.js';

export interface SlashCommand {
	data: {
		name: string;
		description: string;
		type: ApplicationCommandType;
		options: ApplicationCommandOption[];
	};
	permissions?: string[];

	run(client: DiscordBot, interaction: CommandInteraction, args: any[]): any;
}
