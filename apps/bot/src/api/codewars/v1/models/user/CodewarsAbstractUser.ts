import User from './User';
import CodeChallenges from './CodeChallenges';
import Ranks from './Ranks';

export default abstract class CodewarsAbstractUser implements User {
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
	) {}
}
