import { Partials, Options } from 'discord.js';
import debugPath from '../utils/debugPath';
import DiscordBot from './structures/DiscordBot';
const LOG = debugPath(__filename);

const initiateClient = () => {
	try {
		// create new instance of DiscordBot (extension of fundamental Client class)
		LOG('Starting Discord bot...');
		return new DiscordBot({
			partials: [
				Partials.Channel,
				Partials.User,
				Partials.GuildMember,
				Partials.Message,
				Partials.Reaction,
			],
			intents: [
				'DirectMessages',
				'DirectMessageReactions',
				'MessageContent',
				'Guilds',
				'GuildMembers',
				'GuildMessages',
				'GuildMessageReactions',
				'GuildEmojisAndStickers',
				'GuildPresences',
			],
			makeCache: Options.cacheWithLimits({
				...Options.DefaultMakeCacheSettings,
				ReactionManager: 200,
				GuildMemberManager: {
					maxSize: 200,
					// keepOverLimit: (member) => member.id === client.user!.id,
				},
			}),
		});
	} catch (e) {
		LOG(e);
	}
};

export default initiateClient;
