import { request } from 'undici';
import CodewarsUserModel from '../models/user/CodewarsUserModel';
import debugPath from '../../../../utils/debugPath';
const LOG = debugPath(__filename);

export const fetchUser = async (usernameOrID: string) => {
	try {
		const { statusCode, body } = await request(
			`https://www.codewars.com/api/v1/users/${usernameOrID}`
		);
		const user: CodewarsUserModel = new CodewarsUserModel(
			await body.json()
		);

		return statusCode === 200 ? user : statusCode;
	} catch (e) {
		LOG(e);
	}
};

/* fetchUser('56434db1abfb0e0df800005f').then((user) => {
	console.log(user);
}); */
