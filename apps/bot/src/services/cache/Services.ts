import DiscordBot from '../../discord/structures/client';
import { MongoClient } from 'mongodb';
import { Browser } from 'puppeteer';

export default class Services {
	private discordBot: DiscordBot;
	private mongodb: MongoClient;
	private browser: Browser;

	public constructor(
		discordBot: DiscordBot,
		mongodb: MongoClient,
		browser: Browser
	) {
		this.discordBot = discordBot;
		this.mongodb = mongodb;
		this.browser = browser;
	}

	public getDiscordBot() {
		return this.discordBot;
	}

	public getMongoDB() {
		return this.mongodb;
	}

	public getPuppeteerBrowser() {
		return this.browser;
	}
}
