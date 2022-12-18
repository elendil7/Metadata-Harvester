import CommandHandler from '../register.commands';

export default class Ping extends CommandHandler {
	async run(message: any) {
		message.reply('pong!');
	}
}
