import DiscordBot from '../structures/DiscordBot';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

export default {
	name: 'ready',
	once: true,

	async run(client: DiscordBot, args: any[]) {
		try {
			LOG(`Logged in as ${client.user!.tag}`);
		} catch (e) {
			LOG(e);
		}
	},
};
