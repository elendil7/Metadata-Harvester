import { DISCORD_BOT_PREFIX, DISCORD_OWNER_ID } from '../../utils/constants';
import { Message, Collection } from 'discord.js';
import { DiscordBot } from '../startDiscordBot';

export default {
	name: 'messageCreate',
	once: false,

	async run(client: DiscordBot, message: Message) {
		// ignore DMs
		if (!message.guild) return;
		// ignore other bots
		if (message.author.bot) return;
		// ignore if prefix not correct
		if (message.content[0] !== DISCORD_BOT_PREFIX) return;

		// get supposed command (message content)
		const command = message.content.replace(DISCORD_BOT_PREFIX, '');
		// get command arguments by each indefinite spans of whitespace, then filter empty values out
		const args = command.split(/ +/).filter((v) => v !== '');

		// only allow owner to run following commands
		if (message.author.id === DISCORD_OWNER_ID) {
			// message.reply({ content: `Hello ${message.author.tag}!` });

			// if message content includes command name, execute the "run" method on that command
			for (const [cName, cObj] of client.commands) {
				// console.log(cName, cObj);

				if (cObj.aliases.includes(args[0])) {
					cObj.run(client, message, args);
				}
			}
			const commands = client.commands;
			// console.log(commands);
		}
	},
};
