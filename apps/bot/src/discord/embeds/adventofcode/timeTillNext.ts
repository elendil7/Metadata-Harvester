import { EmbedBuilder } from '@discordjs/builders';
import {
	Command_Group_Colours,
	messageORinteraction,
	PNG_Links,
	Symbols,
} from '../../../utils/constants';
import DiscordBot from '../../structures/DiscordBot';
import { getUser } from '../../utils/compatibility/getUser';

const timeUntilNextAocEmbedConstructor = async (
	client: DiscordBot,
	structure: messageORinteraction,
	userDate?: string
) => {
	// get current date
	let now: Date;

	if (userDate) {
		let [year, month, day, hour] = userDate.split(':');
		if (year && month && day && hour)
			now = new Date(+year, +month - 1, +day, +hour);
		else now = new Date();
	} else {
		now = new Date();
	}

	const nowYear = now.getFullYear();
	const nowMonth = now.getMonth() + 1;
	const nowDay = now.getDate();
	const nowHours = now.getHours();

	/* 	console.log(
		`Date: ${now}`,
		`Year: ${nowYear}`,
		`Month: ${nowMonth}`,
		`Day: ${nowDay}`,
		`Hours: ${nowHours}`
	); */

	let aocDate: Date;

	// * Get day of next AOC challenge
	// case for getting this year's day 1 of AOC (month is not yet 12, or month is more than 12)
	if (nowMonth < 12 || (nowDay === 1 && nowHours < 5)) {
		// day 1 of AOC @ 5AM
		aocDate = new Date(nowYear, 12 - 1, 1, 5);
	}
	// case for getting next year's day 1 of AOC (month is 12, day is 25 but AOC has already started or AOC days have already passed)
	else if (
		nowMonth === 12 &&
		((nowDay === 25 && nowHours >= 5) || nowDay > 25)
	) {
		aocDate = new Date(nowYear + 1, 12 - 1, 1, 5);
	}
	// otherwise, AOC has already begun, and you're inside the December days of 1 - 25
	else {
		// if current hour is > 5 get next day's AOC time
		if (nowHours > 5) {
			aocDate = new Date(nowYear, 12 - 1, nowDay + 1, 5);
		}
		// otherwise get today's AOC time
		else {
			aocDate = new Date(nowYear, 12 - 1, nowDay, 5);
		}
	}

	const differenceInMilliseconds = Math.abs(
		now.getTime() - aocDate.getTime()
	);

	const differenceInMonths = Math.floor(
		differenceInMilliseconds / 2629746000
	);
	const differenceInWeeks = Math.floor(differenceInMilliseconds / 604800000);
	const differenceInDays = Math.floor(differenceInMilliseconds / 86400000);
	const differenceInHours = Math.floor(differenceInMilliseconds / 3600000);
	const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
	const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

	const user = await getUser(client, structure);

	return new EmbedBuilder()
		.setColor(Command_Group_Colours.ADVENTOFCODE_COLOUR)
		.setThumbnail(PNG_Links.ADVENT_OF_CODE)
		.setTitle(`${Symbols.STAR} Time until next AOC!`)
		.setAuthor({
			name: `Start date: ${now}`,
		})
		.addFields(
			{
				name: 'Months',
				value: '```' + differenceInMonths + '```',
				inline: true,
			},
			{
				name: 'Weeks',
				value: '```' + differenceInWeeks + '```',
				inline: true,
			},
			{
				name: 'Days',
				value: '```' + differenceInDays + '```',
				inline: true,
			},
			{
				name: 'Hours',
				value: '```' + differenceInHours + '```',
				inline: true,
			},
			{
				name: 'Minutes',
				value: '```' + differenceInMinutes + '```',
				inline: true,
			},
			{
				name: 'Seconds',
				value: '```' + differenceInSeconds + '```',
				inline: true,
			},
			{
				name: 'Milliseconds',
				value: '```' + differenceInMilliseconds + '```',
				inline: true,
			},
			{
				name: 'Microseconds',
				value: '```' + 'N.A.' + '```',
				inline: true,
			},
			{
				name: 'Nanoseconds',
				value: '```' + 'N.A.' + '```',
				inline: true,
			}
		)
		.setTimestamp()
		.setFooter({
			text: `User: ${user.tag} | ID: ${user.id}`,
			iconURL: user.displayAvatarURL({
				forceStatic: false,
			}),
		});
};
export default timeUntilNextAocEmbedConstructor;
