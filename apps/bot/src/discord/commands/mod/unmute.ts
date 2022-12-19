import Command from '../register.commands';
import { Client, Message } from 'discord.js';

export default class Unmute extends Command {
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
