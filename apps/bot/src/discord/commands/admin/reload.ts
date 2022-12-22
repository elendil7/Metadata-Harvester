import Command from '../../structures/command';
import { Client, Message } from 'discord.js';

export default class Reload extends Command {
	constructor() {
		super();
		this.name = 'reload';
		this.aliases = ['reload', ''];
		this.group = '';
		this.permissions = [];
		this.description = '';
		this.emoji = '🔄';
	}
	public async run(client: Client, message: Message) {
		message.reply('reloaded!');
	}
}
