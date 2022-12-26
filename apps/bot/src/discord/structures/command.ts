import { PermissionFlagsBits } from 'discord.js';
import DiscordBot from './client';

export default class Command {
	public name: string;
	public aliases: string[];
	public group: string;
	public permissions: bigint[];
	public ownerOnly: boolean;
	public description: string;
	public emoji: string;

	constructor() {
		this.name = 'exampleName';
		this.aliases = ['exampleName1', 'exampleName2'];
		this.group = 'exampleGroup';
		this.permissions = [PermissionFlagsBits.ReadMessageHistory];
		this.ownerOnly = false;
		this.description = 'This example command does things.';
		this.emoji = '🔌';
		this.run = this.run;
	}

	public async run(client: DiscordBot, ...args: any[]): Promise<any> {}
}
