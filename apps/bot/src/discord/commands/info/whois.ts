import Command from '../../structures/command';
import { Message } from 'discord.js';
import DiscordBot from '../../structures/client';
import errorConstructor from '../../utils/embeds/reusable/errors';
import whoisConstructor from '../../utils/embeds/info/whois';
import { getGuildMember } from '../../utils/methods/getGuildMember';
import { getUserRoles } from '../../utils/methods/getUserRoles';

export default class Whois extends Command {
	constructor() {
		super();
		this.name = 'whois';
		this.aliases = ['whois', 'userinfo'];
		this.group = 'info';
		this.permissions = [];
		this.description = 'Get basic info about selected user (or thyself).';
		this.emoji = '👤';
	}
	public async run(client: DiscordBot, message: Message, args: string[]) {
		try {
			// get first user mention in message
			const target = message.mentions.users.first() || message.author;

			// get target user in guildMember form, to get joinedAt() timestamp
			const guildMember = await getGuildMember(target, message.guild!);

			// get user roles
			const roles = await getUserRoles(guildMember).then((res) =>
				res
					.sort((a, b) => a.name.length - b.name.length)
					.slice(0, 30)
					.join(', ')
			);

			// create embed and send it to discord
			const embed1 = await whoisConstructor(
				client,
				message,
				target,
				guildMember,
				roles
			);

			message.reply({ embeds: [embed1] });
		} catch (e: any) {
			errorConstructor(client, message, e);
		}
	}
}
