import { Client } from 'discord.js';

export default class Command {
	public name: string;
	public aliases: string[];
	public group: string;
	public permissions: string[];
	public description: string;
	public emoji: string;

	constructor() {
		this.name = 'exampleName';
		this.aliases = ['exampleName1', 'exampleName2'];
		this.group = 'exampleGroup';
		this.permissions = ['examplePerm1', 'examplePerm2'];
		this.description = 'This example command does things.';
		this.emoji = '🔌';
		this.run = this.run;
	}

	public async run(client: Client, ...args: any[]) {}
}
