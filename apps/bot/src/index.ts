import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '..', '.env') });
import { DISCORD_BOT_TOKEN, Symbols } from './utils/constants';
import initiateClient from './discord/startDiscordBot';

import debugPath from './utils/debugPath';
import { sleep } from './utils/sleep';
const LOG = debugPath(__filename);

const execute = async () => {
	LOG(`<<<${new Date().toUTCString()}>>>`);
	LOG(`${Symbols.LOADING} Loading program components sequentially...`);

	// * Full discord bot initialization
	/* 
        - Discord bot (client, commands, events)
        - Databases
        - API (server)
    */

	// initiate instance of DiscordBot
	const discordBot = await initiateClient();
	// quit if no discord bot found, quit
	if (!discordBot) {
		LOG('Failed to load discord bot');
		return;
	}

	// load events
	await discordBot.loadEvents('events');

	// load normal commands
	await discordBot.loadCommands('commands');

	// load slash commands
	await discordBot.loadCommands('slashcommands');

	// register new/updated slash commands using Discord REST API (if config option set to true)
	await discordBot.registerSlashCommands();

	// start discord bot (with partials, intents, and cache)
	await discordBot.start(DISCORD_BOT_TOKEN);

	await sleep(3);

	// delete slash commands using Discord REST API (if config option set to true)
	await discordBot.deleteSlashCommands();

	LOG(`${Symbols.SUCCESS} Program successfully loaded!`);
};

execute();
