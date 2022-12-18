import { Client } from 'discord.js';

export default class EventHandler {
	public client;
	public name;
	public _listener;

	constructor(client: Client, name: string) {
		this.client = client;
		this.name = name;
		this._listener = this._run.bind(this);
	}

	public async _run(...args: any) {
		try {
			await this._listener(...args);
		} catch (e) {
			console.error(e);
		}
	}

	public startListener() {
		this.client.on(this.name, this._listener);
	}

	public stopListener() {
		this.client.off(this.name, this._listener);
	}
}
