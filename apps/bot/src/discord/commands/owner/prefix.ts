import { Client, Message } from 'discord.js';
import Command from '../../structures/command';

export default class Prefix extends Command {
	constructor() {
		super();
		this.name = 'prefix';
		this.aliases = ['prefix', ''];
		this.group = 'owner';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
