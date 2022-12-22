import Command from '../../structures/command';
import DiscordBot from '../../structures/client';
import puppeteer from 'puppeteer';
import { Message } from 'discord.js';

export default class GetRemoteChallenge extends Command {
	constructor() {
		super();
		this.name = 'getremotechallenge';
		this.aliases = ['remote', 'remotechallenge', 'getremotechallenge'];
		this.group = 'codewars';
		this.permissions = [''];
		this.description = 'This command fetches remote codewars challenge.';
		this.emoji = '🧩';
		this.run = this.run;
	}

	public async run(client: DiscordBot, message: Message): Promise<void> {}
}
