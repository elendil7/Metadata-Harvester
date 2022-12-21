import { DiscordBot } from '../startDiscordBot';
import debug from 'debug';
import { Symbols } from '../../utils/constants';

export default {
	name: 'error',
	once: false,

	async run(client: DiscordBot, error: Error) {
		const LOG = debug(
			'Metadata-Harvester:apps:bot:src:discord:events:error.ts'
		);
		LOG(`${Symbols.FAILURE} WebSocket Connection Error: `, error);
	},
};
