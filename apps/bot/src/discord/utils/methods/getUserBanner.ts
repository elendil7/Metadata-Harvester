import { request } from 'undici';
import { DISCORD_BOT_TOKEN, Images_Sizes } from '../../../utils/constants';

const getUserBanner = async (uid: string) => {
	const { statusCode, headers, trailers, body } = await request(
		`https://discord.com/api/v8/users/${uid}`,
		{
			headers: {
				authorization: `Bot ${DISCORD_BOT_TOKEN}`,
			},
		}
	);

	// get data
	const data: any = await body.json();
	let banner = data['banner'];

	if (statusCode === 200 && banner) {
		// console.log(data);

		// get info for http GET request for banner
		let format = 'png';
		if (banner.substring(0, 2) === 'a_') {
			format = 'gif';
		}
		let size = Images_Sizes.XXLARGE;

		// return user's banner
		return `https://cdn.discordapp.com/banners/${uid}/${banner}.${format}?size=${size}`;
	} else {
		// return no banner
		return null;
	}
};

export default getUserBanner;
