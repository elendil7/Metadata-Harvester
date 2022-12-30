import { REST, Routes } from 'discord.js';
import DiscordBot from '../structures/client';
import {
	DELETE_GLOBAL_SLASH_COMMANDS,
	DELETE_GUILD_SLASH_COMMANDS,
	DISCORD_BOT_ID,
	DISCORD_BOT_TOKEN,
	DISCORD_GUILD_IDS,
} from '../../utils/constants';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

const deleteSlashCommands = async (client: DiscordBot, commands: string[]) => {
	const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

	try {
		// if config set to delete ALL guild slash commands, execute
		if (DELETE_GUILD_SLASH_COMMANDS === 'true') {
			const guildIDs = DISCORD_GUILD_IDS.split(' ');

			for (let i = 0; i < guildIDs.length; ++i) {
				await rest.put(
					Routes.applicationGuildCommands(
						DISCORD_BOT_ID,
						guildIDs[i]
					),
					{ body: [] }
				);
			}

			LOG(
				`Regrettably deleted ${commands.length} <guild> slash (/) commands.`
			);
		}

		// if config set to delete ALL global slash commands, execute
		if (DELETE_GLOBAL_SLASH_COMMANDS === 'true') {
			await rest.put(Routes.applicationCommands(DISCORD_BOT_ID), {
				body: [],
			});
			LOG(
				`Regrettably deleted ${commands.length} <global> slash (/) commands.`
			);
		}
	} catch (e) {
		LOG(e);
	}
};

export default deleteSlashCommands;
