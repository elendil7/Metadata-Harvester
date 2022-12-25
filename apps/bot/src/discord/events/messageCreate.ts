import { DISCORD_BOT_PREFIX } from '../../utils/constants';
import { Message } from 'discord.js';
import DiscordBot from '../structures/client';
import errorConstructor from '../embeds/reusable/errors';

export default {
	name: 'messageCreate',
	once: false,

	async run(client: DiscordBot, message: Message) {
		try {
			// ignore DMs
			if (!message.guild) return;
			// ignore other bots
			if (message.author.bot) return;
			// ignore if prefix not correct
			if (message.content[0] !== DISCORD_BOT_PREFIX) return;

			// get supposed command (message content)
			const command = message.content.replace(DISCORD_BOT_PREFIX, '');
			// get command arguments by each indefinite spans of whitespace, then filter empty values out (keep falsy values though - only remove empty strings)
			const args = command.split(/ +/).filter((v) => v !== '');

			// only allow owner to run following commands
			//if (message.author.id === DISCORD_OWNER_ID) {
			// message.reply({ content: `Hello ${message.author.tag}!` });}

			// ensure that command is valid even in mixed case / uppercase
			const potentialCommand = args[0].toLowerCase();

			// if message content includes command name, execute the "run" method on that command
			for (const [cName, cCmd] of client.commands) {
				// console.log(cName, cObj);

				if (cCmd.aliases.includes(potentialCommand)) {
					cCmd.run(client, message, args);
				}
			}

			/* 			const commands = client.commands;
			console.log(commands); */
		} catch (e: any) {
			errorConstructor(client, message, e);
		}
	},
};
