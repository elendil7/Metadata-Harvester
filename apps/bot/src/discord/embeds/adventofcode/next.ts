import { EmbedBuilder } from '@discordjs/builders';
import {
	Command_Group_Colours,
	messageORinteraction,
	PNG_Links,
} from '../../../utils/constants';
import DiscordBot from '../../structures/client';
import { getUser } from '../../utils/compatibility/getUser';

const timeUntilNextAocEmbedConstructor = async (
	client: DiscordBot,
	structure: messageORinteraction
) => {
	const user = await getUser(client, structure);

	return new EmbedBuilder()
		.setColor(Command_Group_Colours.ADVENTOFCODE_COLOUR)
		.setThumbnail(PNG_Links.ADVENT_OF_CODE)
		.setTitle('Next Advent of Code')
		.addFields(
			{
				name: 'Time until next AOC:',
				value: `${5} nanoseconds`,
				inline: false,
			},
			{
				name: 't',
				value: `t`,
				inline: false,
			},
			{
				name: 'Time until next aoc',
				value: `t`,
				inline: false,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag} | ID: ${user.id}`,
			iconURL: user?.displayAvatarURL({
				forceStatic: false,
			}),
		});
};
export default timeUntilNextAocEmbedConstructor;
