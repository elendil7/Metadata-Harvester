import Command from '../../structures/command';
import { Client, Message } from 'discord.js';

export default class Ban extends Command {
	constructor() {
		super();
		this.name = 'ban';
		this.aliases = ['ban', 'banish'];
		this.group = 'mod';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
