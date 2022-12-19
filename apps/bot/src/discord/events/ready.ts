import debug from 'debug';
import { Client } from 'discord.js';

export default {
	name: 'messageCreate',
	once: true,

	async run(args: any[], client: Client) {
		debug('Metadata-Harvester:apps:bot:src:discord:events:ready.ts')(
			`Logged in as ${client.user!.tag}`
		);
	},
};
