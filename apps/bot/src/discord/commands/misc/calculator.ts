import debug from 'debug';
import Command from '../register.commands';
import { EmbedBuilder } from '@discordjs/builders';
import { Message, Client, PermissionFlagsBits } from 'discord.js';

const LOG = debug(
	'Metadata-Harvester:apps:bot:src:commands:misc:calculator.ts'
);

export default class Calculator extends Command {
	constructor() {
		super();
		this.name = 'calculator';
		this.aliases = ['calculator', 'calculate', 'calc', 'derive'];
		this.group = '';
		this.permissions = [];
		this.description = 'Performs mathematical operations on input numbers';
		this.emoji = '🔢';
		this.run = this.run;
	}

	public async run(client: Client, message: Message, args: string[]) {
		console.log(args);

		if (args[1] === 'eval') {
			const output = await this.evalExpression(args[2]);
			message.reply({ content: output });
		}
	}

	private async evalExpression(expression: string) {
		return expression
			? `${expression} = ${eval(expression)}`
			: `Invalid expression`;
	}

	private async evalTwoNumbers(
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
	}
}
