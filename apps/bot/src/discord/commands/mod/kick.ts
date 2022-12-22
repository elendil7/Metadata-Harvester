import Command from '../../structures/command';
import { Client, Message } from 'discord.js';

export default class Kick extends Command {
	constructor() {
		super();
		this.name = 'kick';
		this.aliases = ['', ''];
		this.group = '';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
