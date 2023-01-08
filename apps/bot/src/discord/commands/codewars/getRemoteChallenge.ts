import Command from '../../structures/Command';
import DiscordBot from '../../structures/DiscordBot';
import puppeteer from 'puppeteer';
import { Message } from 'discord.js';

export default class GetRemoteChallenge extends Command {
	constructor() {
		super();
		this.name = 'getremotechallenge';
		this.aliases = ['remote', 'remotechallenge', 'getremotechallenge'];
		this.group = 'codewars';
		this.permissions = [];
		this.description = 'Fetches a random remote codewars challenge';
		this.emoji = '🧩';
	}

	public async run(client: DiscordBot, message: Message): Promise<void> {}
}
