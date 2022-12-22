import { Client, Message } from 'discord.js';
import Command from '../../structures/command';

export default class Prefix extends Command {
	constructor() {
		super();
		this.name = '';
		this.aliases = ['', ''];
		this.group = '';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
