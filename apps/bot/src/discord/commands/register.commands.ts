import { Client } from 'discord.js';

export default class CommandHandler {
	public client;
	public name;

	constructor(client: Client, name: string) {
		this.client = client;
		this.name = name;
	}
}
