import Command from '../../structures/command';
import DiscordBot from '../../structures/client';
import { Message } from 'discord.js';
import { Map } from 'typescript';
import { readdirSync, readFileSync } from 'fs';
import codewarsChallengeConstruction from '../../embeds/codewars/challenge';
import { join } from 'path';
import errorConstructor from '../../embeds/reusable/errors';

export default class GetLocalChallenge extends Command {
	private challengeNames;

	constructor() {
		super();
		this.name = 'puzzle';
		this.aliases = ['puzzle', 'puzzle', 'challenge', 'getchallenge'];
		this.group = 'codewars';
		this.permissions = [];
		this.description = 'Fetches a random codewars challenge';
		this.emoji = '🧩';
		this.challengeNames = new Array<string>();
	}

	public async run(client: DiscordBot, message: Message): Promise<void> {
		try {
			// if map is not yet filled, fill it with challenge names by reading directory
			if (this.challengeNames.length === 0) {
				this.challengeNames = readdirSync(
					join(__dirname, '../../../data/katas'),
					'utf-8'
				)
					.filter((file) => file.endsWith('.json'))
					.map((file) => file.split('.json')[0]);
			}

			// get random challenge from directory
			const challengeName =
				this.challengeNames[
					Math.floor(Math.random() * this.challengeNames.length)
				];
			const selectedChallenge = JSON.parse(
				readFileSync(
					join(
						__dirname,
						`../../../data/katas/${challengeName}.json`
					),
					'utf-8'
				)
			);

			// print embed to discord
			codewarsChallengeConstruction(client, message, selectedChallenge);
		} catch (e: any) {
			errorConstructor(client, message, e);
		}
	}
}
