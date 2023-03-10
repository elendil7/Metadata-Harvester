import { Message } from 'discord.js';
import debugPath from '../../../utils/debugPath';
import timeUntilNextAocEmbedConstructor from '../../embeds/adventofcode/timeTillNext';
import errorConstructor from '../../embeds/reusable/errors';
import DiscordBot from '../../structures/DiscordBot';
import Command from '../../structures/Command';
const LOG = debugPath(__filename);

export default class TimeTillNext extends Command {
	constructor() {
		super();
		this.name = 'timetillnext';
		this.aliases = ['timetillnext', 'aoc', 'aoctime'];
		this.group = 'adventofcode';
		this.permissions = [];
		this.description =
			'Check how much time left till the next AOC challenge.';
		this.emoji = '🧩';
	}

	public async run(
		client: DiscordBot,
		message: Message,
		args: string[]
	): Promise<void> {
		try {
			let embed = await timeUntilNextAocEmbedConstructor(
				client,
				message,
				args[0]
			);

			await message.reply({ embeds: [embed] });
		} catch (e: any) {
			await errorConstructor(client, message, e);
		}
	}
}
