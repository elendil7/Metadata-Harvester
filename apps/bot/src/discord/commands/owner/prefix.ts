import { Client, Message } from 'discord.js';
import Command from '../../structures/Command';

export default class Prefix extends Command {
	constructor() {
		super();
		this.name = 'prefix';
		this.aliases = ['prefix', 'changeprefix', 'setprefix'];
		this.group = 'owner';
		this.permissions = [];
		this.ownerOnly = true;
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
