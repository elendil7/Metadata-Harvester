import { request } from 'undici';
import debugPath from '../../../../utils/debugPath';
import CodewarsUserModel from '../models/user/CodewarsUserModel';
const LOG = debugPath(__filename);

export const fetchUser = async (usernameOrID: string) => {
	try {
		const { statusCode, body } = await request(
			`https://www.codewars.com/api/v1/users/${usernameOrID}`
		);

		return statusCode === 200
			? new CodewarsUserModel(await body.json())
			: statusCode;
	} catch (e) {
		LOG(e);
	}
};

/* fetchUser('56434db1abfb0e0df800005f').then((user) => {
	console.log(user);
}); */
