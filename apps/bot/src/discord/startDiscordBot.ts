import debug from 'debug';
import { DISCORD_BOT_PREFIX } from '../utils/constants';
import { Client, Partials, Collection, Options } from 'discord.js';
import { getEvents, getCommands } from './utils/getFiles';

const LOG = debug('Metadata-Harvester:apps:bot:src:startBot.ts');

export const initiateClient = async () => {
	// create new instance of DiscordBot (extension of fundamental Client class)
	LOG('Starting Discord bot...');
	const discordBot: DiscordBot = new DiscordBot({
		partials: [
			Partials.Channel,
			Partials.User,
			Partials.GuildMember,
			Partials.Message,
			Partials.Reaction,
		],
		intents: [
			'DirectMessages',
			'DirectMessageReactions',
			'MessageContent',
			'Guilds',
			'GuildMembers',
			'GuildMessages',
			'GuildMessageReactions',
			'GuildEmojisAndStickers',
		],
		makeCache: Options.cacheWithLimits({
			...Options.DefaultMakeCacheSettings,
			ReactionManager: 200,
			GuildMemberManager: {
				maxSize: 200,
				// keepOverLimit: (member) => member.id === client.user!.id,
			},
		}),
	});

	return discordBot;
};

export class DiscordBot extends Client {
	public prefix;
	public events;
	public commands;

	constructor(args: any) {
		super(args);
		this.prefix = DISCORD_BOT_PREFIX;
		this.events = new Collection();
		this.commands = new Collection();
	}

	public async start(token: string) {
		// login to Discord using bot token
		await super.login(token);
		LOG('Logged in to Discord.');
	}

	public async loadEvents() {
		// get all file names of events from imported function
		const events = getEvents();
		console.log(events);
		// if event file names were fetched
		if (events) {
			// loop through event file names
			for (let i = 0; i < events.length; ++i) {
				// get event name
				const eventName = events[i];

				// unsure
				const EventHandler = (
					await import(`${__dirname}/events/${eventName}`)
				).default;

				// initiate instance (object) of child EventHandler class with event name
				const event = new EventHandler(this, eventName);
				// start listening for changes
				event.startListener();
				// add the event object to the collection of events, to be accessed anytime
				this.events.set(eventName, event);
			}
		} else {
			// if no events were fetched, send error message
			console.error('No events found.');
		}
	}

	public async loadCommands() {
		const commands = getCommands();
		console.log(commands);
		if (commands) {
			for (let i = 0; i < commands.length; ++i) {
				const commandName = commands[i];

				const CommandHandler = (
					await import(`${__dirname}/commands/${commandName}`)
				).default;

				const command = new CommandHandler(this, commandName);
				this.commands.set(commandName, command);
			}
		} else {
			console.error('No commands found.');
		}
	}

	public getCommand(commandName: string) {
		return this.commands.get(commandName);
	}
}
