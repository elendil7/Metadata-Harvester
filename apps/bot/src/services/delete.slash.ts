import { REST } from 'discord.js';
import DiscordBot from '../discord/structures/client';
import {
	DELETE_GLOBAL_SLASH_COMMANDS,
	DELETE_GUILD_SLASH_COMMANDS,
	DISCORD_BOT_TOKEN,
} from '../utils/constants';
import debugPath from '../utils/debugPath';
const LOG = debugPath(__filename);

const deleteSlashCommands = async (client: DiscordBot, commands: string[]) => {
	// TODO const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

	// if config set to delete ALL guild slash commands, execute
	if (DELETE_GUILD_SLASH_COMMANDS === 'true') {
		client.application?.commands.set([]);
		LOG(
			`Regrettably deleted ${commands.length} <guild> slash (/) commands.`
		);
	}

	// if config set to delete ALL global slash commands, execute
	if (DELETE_GLOBAL_SLASH_COMMANDS === 'true') {
		client.application?.commands.set([]);
		LOG(
			`Regrettably deleted ${commands.length} <global> slash (/) commands.`
		);
	}
};

export default deleteSlashCommands;
