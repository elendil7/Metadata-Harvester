import { puppeteerBrowser } from '../../..';
import debugPath from '../../../utils/debugPath';
const LOG = debugPath(__filename);

export const fetchUserImage = async (username: string) => {
	try {
		// initiate new page
		const codewarsPage = await puppeteerBrowser.newPage();

		// go to user's codewars page
		await codewarsPage.goto(`https://www.codewars.com/users/${username}`);

		// wait for page to load images
		await codewarsPage.waitForSelector('img');

		// execute code on the browser's frontend (pure JS) using evaluate method
		return await codewarsPage.evaluate(async (username: string) => {
			// get all images from current webpage (run js code as though you're on the page itself)
			const images = document.querySelectorAll('img');

			// get user's profile picture image from codewars page
			for (let i = 0; i < images.length; ++i) {
				// loop through "NodeListOf<HTMLImageElement>" and find the one with the user's profile picture
				if (images[i].title === username) {
					// return the image's src attribute
					return images[i].src;
				}
			}

			// if no profile picture found, return default one
			return 'https://www.codewars.com/packs/assets/profile-pic.f3a90aca.png';
		}, username);
	} catch (e) {
		LOG(e);
	}
};
