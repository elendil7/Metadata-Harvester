import CodewarsAbstractUser from './CodewarsAbstractUser';
import Ranks from './Ranks';
import CodeChallenges from './CodeChallenges';
import User from './User';

export default class CodewarsUserModel extends CodewarsAbstractUser {
	constructor(user: User) {
		super(
			user.id,
			user.username,
			user.name,
			user.honor,
			user.clan,
			user.leaderboardPosition,
			user.skills,
			user.ranks,
			user.codeChallenges
		);
	}
}
