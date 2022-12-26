import Command from '../../structures/command';
import { Message } from 'discord.js';
import DiscordBot from '../../structures/client';
import errorConstructor from '../../embeds/reusable/errors';
import { invalidCommandConstructor } from '../../embeds/reusable/invalidCommand';
import debugPath from '../../../utils/debugPath';
const LOG = debugPath(__filename);

export default class Calculator extends Command {
	constructor() {
		super();
		this.name = 'calculator';
		this.aliases = ['calculator', 'calculate', 'calc', 'derive'];
		this.group = 'misc';
		this.permissions = [];
		this.description = 'Performs mathematical operations on input numbers';
		this.emoji = '🔢';
	}

	public async run(client: DiscordBot, message: Message, args: string[]) {
		try {
			// get which command user wants to execute
			const choice = args[1];
			// get expression from args (everything after the command)
			const expression = args.slice(2).join('');

			switch (choice) {
				case 'eval':
					const output = await this.evalExpression(expression);
					await message.reply({ content: output });
					break;
				default:
					await message.reply({
						embeds: [
							await invalidCommandConstructor(
								message.author,
								this
							),
						],
					});
					break;
			}
		} catch (e: any) {
			errorConstructor(client, message, e);
		}
	}

	private async evalExpression(expression: string): Promise<string> {
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
	): Promise<void> {
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
			LOG(e);
		}
	}
}
