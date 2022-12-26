import Command from '../../structures/command';
import { Message, PermissionFlagsBits, PermissionsBitField } from 'discord.js';
import pingEmbededConstructor from '../../embeds/info/ping';
import DiscordBot from '../../structures/client';
import debugPath from '../../../utils/debugPath';
const LOG = debugPath(__filename);

export default class Ping extends Command {
	constructor() {
		super();
		this.name = 'ping';
		this.aliases = ['ping', 'latency'];
		this.group = 'info';
		this.permissions = [];
		this.description = 'Gets bot latency (ping) in ms';
		this.emoji = '🏓';
	}
	public async run(client: DiscordBot, message: Message) {
		try {
			await message.reply({
				embeds: [await pingEmbededConstructor(client, message)],
			});
		} catch (e) {
			LOG(e);
		}
	}
}
