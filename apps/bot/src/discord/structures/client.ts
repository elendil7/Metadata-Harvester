import { DISCORD_BOT_PREFIX } from '../../utils/constants';
import bootstrapCommands from '../commands/!load.commands';
import bootstrapEvents from '../events/!load.events';
import debugPath from '../../utils/debugPath';
import { Client, Collection } from 'discord.js';
import Command from './command';
import registerSlashCommands from '../../services/register.slash';
const LOG = debugPath(__filename);

export default class DiscordBot extends Client {
	public prefix;
	public events: Collection<string, Event>;
	public commands: Collection<string, Command>;
	public slashCommands: Collection<string, any>;

	constructor(args: any) {
		super(args);
		this.prefix = DISCORD_BOT_PREFIX;
		this.events = new Collection();
		this.commands = new Collection();
		this.slashCommands = new Collection();
	}

	public async start(token: string) {
		try {
			// login to Discord using bot token
			await super.login(token);
			LOG('Logged in to Discord.');
		} catch (e) {
			LOG(e);
		}
	}

	public async loadEvents(searchDir: string) {
		try {
			await bootstrapEvents(this, searchDir);
		} catch (e) {
			LOG(e);
		}
	}

	public async loadCommands(searchDir: string) {
		try {
			await bootstrapCommands(this, searchDir);
		} catch (e) {
			LOG(e);
		}
	}

	public async registerSlashCommands(): Promise<void> {
		try {
			// get array of slash commands
			const slashCmds = this.slashCommands.map((v) => v.data);

			await registerSlashCommands(slashCmds);

			LOG('Registered new slash commands.');
		} catch (e) {
			LOG(e);
		}
	}

	public getCommand(commandName: string) {
		try {
			return this.commands.get(commandName);
		} catch (e) {
			LOG(e);
		}
	}
}
