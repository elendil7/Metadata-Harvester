import debug from 'debug';
import { DISCORD_BOT_PREFIX } from '../utils/constants';
import { Client, Partials, Collection, Options } from 'discord.js';
import { getEvents, getCommands } from './utils/getFiles';
import Command from './commands/register.commands';

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
	public events: Collection<string, Event>;
	public commands: Collection<string, Command>;

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
		const eventNames = await getEvents();
		// if event file names were fetched
		if (eventNames) {
			// loop through event file names
			for (let i = 0; i < eventNames.length; ++i) {
				// get event name
				const eventName = eventNames[i];
				const curEvent = (await import(`./events/${eventName}`))
					?.default;
				if (curEvent.once) {
					// if even only requires to be triggered once
					this.once(curEvent.name, (...args) =>
						curEvent.run(this, ...args)
					);
				} else {
					// otherwise expect event to be triggered multiple times
					this.on(curEvent.name, (...args) =>
						curEvent.run(this, ...args)
					);
				}
				// add the event object to the collection of events, to be accessed anytime
				this.events.set(eventName, curEvent);

				// console.log(this.events);
			}
			LOG('Events loaded.');
		} else {
			// if no events were fetched, send error message
			LOG('No events found.');
		}
	}

	public async loadCommands() {
		// get collection of commandgroups & commands
		const commandGroups = await getCommands();

		// if any commands exist
		if (commandGroups) {
			// iterate through command groups
			for (const [cGroup, vCmds] of commandGroups) {
				// iterate through all commands in current group
				for (let i = 0; i < vCmds.length; ++i) {
					// import current command in group
					const curCommand = (
						await import(`./commands/${cGroup}/${vCmds[i]}`)
					)?.default;

					// add command name & full command to "commands" field of type "collection"
					this.commands.set(vCmds[i], new curCommand());

					/* 					console.log(
						`Group: ${cGroup}, Name: ${vCmds[i]}, Command`,
						curCommand
					); */
				}
			}

			LOG('Commands loaded.');
		} else {
			LOG('No commands found.');
		}
	}

	public getCommand(commandName: string) {
		return this.commands.get(commandName);
	}
}
