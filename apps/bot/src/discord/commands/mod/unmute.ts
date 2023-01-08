import Command from '../../structures/Command';
import { Client, Message } from 'discord.js';

export default class Unmute extends Command {
	constructor() {
		super();
		this.name = 'unmute';
		this.aliases = ['unmute', 'unsilence'];
		this.group = 'mod';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
