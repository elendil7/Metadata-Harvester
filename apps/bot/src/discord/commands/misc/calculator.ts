import debug from 'debug';
import { EmbedBuilder } from '@discordjs/builders';

const LOG = debug(
	'Metadata-Harvester:apps:bot:src:commands:misc:calculator.ts'
);

export default {
	async evalTwoNumbers(
		a: number,
		b: number,
		operator: string,
		applyRandomOperation?: boolean,
		randomNumberMax?: number
	) {
		try {
			LOG('Performing calculation');
			const initialRes = eval(`${a}${operator}${b}`);
			if (applyRandomOperation && randomNumberMax) {
				const operators = ['+', '-', '*', '/'];
				const chosenOperator =
					operators[Math.floor(Math.random() * operators.length)];
				const chosenNumber = Math.floor(
					Math.random() * (randomNumberMax + 1)
				);
				console.log(
					`Chosen operator: ${chosenOperator}, Chosen number: ${chosenNumber}`
				);
				const output = eval(
					`${initialRes}${chosenOperator}${chosenNumber}`
				);
				LOG('Finished calculation');
				return output;
			} else {
				return initialRes;
			}
		} catch (e) {
			return `\nError encountered: ${String(e).split('\n')[0]}\n`;
		}
	},

	async evalExpression(expression: string) {
		return `${expression} = ${eval(expression)}`;
	},
};
