import Command from '../../structures/Command';
import { Client, Message } from 'discord.js';

export default class Kick extends Command {
	constructor() {
		super();
		this.name = 'kick';
		this.aliases = ['kick', 'dropkick'];
		this.group = 'mod';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: Client, message: Message) {}
}
