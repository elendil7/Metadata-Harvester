import Command from '../../structures/command';
import { Message } from 'discord.js';
import pingEmbededConstructor from '../../utils/embeds/info/ping';
import DiscordBot from '../../structures/client';
import debugPath from '../../../utils/debugPath';
const LOG = debugPath(__filename);

export default class Ping extends Command {
	constructor() {
		super();
		this.name = 'ping';
		this.aliases = ['ping', 'latency'];
		this.group = '';
		this.permissions = [];
		this.description = '';
		this.emoji = '';
	}
	public async run(client: DiscordBot, message: Message) {
		try {
			message.reply({
				embeds: [await pingEmbededConstructor(client, message)],
			});
		} catch (e) {
			LOG(e);
		}
	}
}
