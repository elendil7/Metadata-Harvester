import { REST, Routes } from 'discord.js';
import {
	DISCORD_BOT_ID,
	DISCORD_BOT_TOKEN,
	DISCORD_GUILD_ID,
	REGISTER_GLOBAL_SLASH_COMMANDS,
	REGISTER_GUILD_SLASH_COMMANDS,
} from '../utils/constants';
import { sleep } from '../utils/sleep';
import debugPath from '../utils/debugPath';
const LOG = debugPath(__filename);

const registerSlashCommands = async (commands: string[]) => {
	try {
		//console.log(commands);

		// Construct and prepare an instance of the REST module
		const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

		// and deploy your commands!
		LOG(
			`Started refreshing ${commands.length} potential application (/) commands.`
		);

		// store total commands reloaded for later
		let totalCommandsReloaded = {
			guild: 0,
			global: 0,
		};

		// if config set to register guild slash commands, execute
		if (REGISTER_GUILD_SLASH_COMMANDS === 'true') {
			// The put method is used to fully refresh all commands in the guild with the current set
			const data: any = await rest.put(
				Routes.applicationGuildCommands(
					DISCORD_BOT_ID,
					DISCORD_GUILD_ID
				),
				{ body: commands }
			);
			totalCommandsReloaded.guild += data.length;
			LOG(
				`Successfully reloaded ${totalCommandsReloaded.guild} <guild> application (/) commands.`
			);
		}

		// if config set to register global slash commands, execute
		if (REGISTER_GLOBAL_SLASH_COMMANDS === 'true') {
			await sleep(2);
			const data: any = await rest.put(
				Routes.applicationCommands(DISCORD_BOT_ID),
				{
					body: commands,
				}
			);
			totalCommandsReloaded.global += data.length;
			LOG(
				`Successfully reloaded ${totalCommandsReloaded.global} <global> application (/) commands.`
			);
		}

		LOG(
			`Successfully reloaded ${
				totalCommandsReloaded.guild + totalCommandsReloaded.global
			} total application (/) commands (guild & global).`
		);
	} catch (e) {
		// And of course, make sure you catch and log any errors!
		LOG(e);
	}
};

export default registerSlashCommands;
