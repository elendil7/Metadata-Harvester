import Command from '../../structures/command';
import { Client, Message } from 'discord.js';

export default class Reload extends Command {
	constructor() {
		super();
		this.name = 'reload';
		this.aliases = ['reload', 'restart', 'reboot', 'reinvigorate'];
		this.group = 'owner';
		this.permissions = [];
		this.ownerOnly = true;
		this.description = '';
		this.emoji = '🔄';
	}
	public async run(client: Client, message: Message) {
		message.reply('reloaded!');
	}
}
