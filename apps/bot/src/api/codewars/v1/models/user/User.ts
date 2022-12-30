import Ranks from './Ranks';
import CodeChallenges from './CodeChallenges';

export default interface User {
	id: string;
	username: string;
	name: string;
	honor: number;
	clan: string;
	leaderboardPosition: number | null;
	skills: string[];
	ranks: Ranks;
	codeChallenges: CodeChallenges;
}
