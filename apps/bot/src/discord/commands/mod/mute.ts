import Command from '../../structures/command';
import { Client, Message } from 'discord.js';

export default class Mute extends Command {
	constructor() {
		super();
		this.name = 'mute';
		this.aliases = ['', ''];
		this.group = '';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
