import Command from '../../structures/command';
import { Client, Message } from 'discord.js';

export default class Help extends Command {
	constructor() {
		super();
		this.name = 'help';
		this.aliases = ['help', 'assist', 'aid', 'sendaid'];
		this.group = '';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
