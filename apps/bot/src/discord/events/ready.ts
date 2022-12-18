import EventHandler from './register.events';
import debug from 'debug';

export class Ready extends EventHandler {
	async run() {
		debug('Metadata-Harvester:apps:bot:src:discord:events:ready.ts')(
			`Logged in as ${this.client.user!.tag}`
		);
	}
}
