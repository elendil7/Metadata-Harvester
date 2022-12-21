import { DiscordBot } from '../startDiscordBot';
import debug from 'debug';

export default {
	name: 'messageCreate',
	once: true,

	async run(client: DiscordBot, args: any[]) {
		debug('Metadata-Harvester:apps:bot:src:discord:events:ready.ts')(
			`Logged in as ${client.user!.tag}`
		);
	},
};
