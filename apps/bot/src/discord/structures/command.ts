import { PermissionFlagsBits } from 'discord.js';
import { DEFAULT_COOLDOWN_TIME } from '../../utils/constants';
import DiscordBot from './DiscordBot';

export default class Command {
	public name: string;
	public aliases: string[];
	public group: string;
	public permissions: bigint[];
	public ownerOnly: boolean;
	public description: string;
	public emoji?: string;
	public cooldown?: number;

	constructor() {
		this.name = 'exampleName';
		this.aliases = ['exampleName1', 'exampleName2'];
		this.group = 'exampleGroup';
		this.permissions = [PermissionFlagsBits.ReadMessageHistory];
		this.ownerOnly = false;
		this.description = 'This example command does things.';
		this.emoji = '🔌';
		this.cooldown = parseInt(DEFAULT_COOLDOWN_TIME); // default cooldown = 2 seconds = 2000 milliseconds
		this.run = this.run;
	}

	public async run(client: DiscordBot, ...args: any[]): Promise<any> {}
}
