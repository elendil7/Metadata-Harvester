import CodewarsAbstractUser from './CodewarsAbstractUser';
import Ranks from './Ranks';
import CodeChallenges from './CodeChallenges';

export default class CodewarsUserModel extends CodewarsAbstractUser {
	constructor(
		public id: string,
		public username: string,
		public name: string,
		public honor: number,
		public clan: string,
		public leaderboardPosition: number | null,
		public skills: string[],
		public ranks: Ranks,
		public codeChallenges: CodeChallenges
	) {
		super(
			id,
			username,
			name,
			honor,
			clan,
			leaderboardPosition,
			skills,
			ranks,
			codeChallenges
		);
	}
}
