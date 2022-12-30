import Command from '../../structures/command';
import DiscordBot from '../../structures/client';
import { Message } from 'discord.js';
import { fetchUser } from '../../../api/codewars/v1/routes/fetchUser';
import CodewarsUserModel from '../../../api/codewars/v1/models/user/CodewarsUserModel';
import debugPath from '../../../utils/debugPath';
import { requestFailedEmbedConstructor } from '../../embeds/api/requestFailed';
import { getUser } from '../../utils/compatibility/getUser';
import { codewarsUserEmbedConstructor } from '../../embeds/codewars/user';
import { invalidCommandConstructor } from '../../embeds/reusable/invalidCommand';
const LOG = debugPath(__filename);

export default class GetCodewarsUser extends Command {
	constructor() {
		super();
		this.name = 'getuser';
		this.aliases = ['getuser', 'codewarsuser', 'getcodewarsuser'];
		this.group = 'codewars';
		this.permissions = [];
		this.description = 'Fetches the profile of a codewars user';
		this.emoji = '👤';
	}

	public async run(
		client: DiscordBot,
		message: Message,
		args: any[]
	): Promise<any> {
		try {
			const user = await getUser(client, message);

			// if no username provided (args[0]), return
			if (!args[0])
				return message.reply({
					embeds: [await invalidCommandConstructor(user, this)],
				});

			// get Codewars User JSON
			const userOrStatuscode = await fetchUser(args[0]);

			// if user exists
			if (userOrStatuscode instanceof CodewarsUserModel) {
				await message.reply({
					embeds: [
						await codewarsUserEmbedConstructor(
							userOrStatuscode,
							user
						),
					],
				});
			}
			// if bad status code
			else if (typeof userOrStatuscode === 'string') {
				await message.reply({
					embeds: [
						await requestFailedEmbedConstructor(
							userOrStatuscode,
							user
						),
					],
				});
			}
		} catch (e) {
			LOG(e);
		}
	}
}
