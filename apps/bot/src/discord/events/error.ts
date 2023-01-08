import DiscordBot from '../structures/DiscordBot';
import { Symbols } from '../../utils/constants';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

export default {
	name: 'error',
	once: false,

	async run(client: DiscordBot, error: Error) {
		try {
			LOG(`${Symbols.FAILURE} WebSocket Connection Error: `, error);
		} catch (e) {
			LOG(e);
		}
	},
};
