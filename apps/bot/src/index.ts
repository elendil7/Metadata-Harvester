import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '..', '.env') });
import { DISCORD_BOT_TOKEN, Symbols, Text_Art } from './utils/constants';
import initiateClient from './discord/startDiscordBot';
import debugPath from './utils/debugPath';
import StartServices from './services/startServices';
import Services from './services/cache/Services';
import DiscordBot from './discord/structures/DiscordBot';
import { MongoClient } from 'mongodb';
import { Browser } from 'puppeteer';
import CooldownManager from './discord/structures/CooldownManager';
const LOG = debugPath(__filename);

LOG(`\n${Text_Art.WHEAT}\n`);

LOG(`<<<${new Date().toUTCString()}>>>`);
LOG(`${Symbols.LOADING} Loading program components sequentially...`);

// * Full discord bot initialization
/* 
        - Discord bot (client, commands, events)
        - Databases
        - API (server)
    */

// define variables for later export
let discordBot: DiscordBot | undefined;
let cooldownManager: CooldownManager;
let mongodb: MongoClient;
let puppeteerBrowser: Browser;

const execute = async () => {
	// initiate instance of DiscordBot
	discordBot = initiateClient();

	// if discord bot is found, continue
	if (discordBot) {
		// load command cooldowns
		cooldownManager = await discordBot.loadCooldowns();

		// load services, step by step
		const startServices = new StartServices();
		// mongodb
		mongodb = await startServices.startMongoDB();
		// create puppeteer browser instance
		puppeteerBrowser = await startServices.startPuppeteer();

		/* 		// Cache the services
		const cachedServices = new Services(
			discordBot,
			mongodb,
			puppeteerBrowser
		); */

		// load normal commands
		await discordBot.loadCommands('commands');

		// load slash commands
		await discordBot.loadCommands('slashcommands');

		// register new/updated slash commands using Discord REST API (if config option set to true)
		await discordBot.registerSlashCommands();

		// start discord bot (with partials, intents, and cache)
		await discordBot.start(DISCORD_BOT_TOKEN);

		// wait before performing next action (without blocking main event loop thread); as slash commands can only be deleted after Client's ready event triggered.
		discordBot.once('ready', () => {
			// delete slash commands using Discord REST API (if config option set to true)
			if (discordBot) discordBot.deleteSlashCommands();
		});

		// load events
		await discordBot.loadEvents('events');

		LOG(`${Symbols.SUCCESS} Program successfully loaded!`);
	}
	// quit if no discord bot found
	else {
		LOG('Failed to load discord bot');
	}
};

execute();

// export clients / managers as singletons for use globally
export { discordBot, cooldownManager, mongodb, puppeteerBrowser };
