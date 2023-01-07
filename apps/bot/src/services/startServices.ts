import { Browser } from 'puppeteer';
import { startMongoDBService } from '../api/mongodb/startMongodb';
import { startPuppeteerService } from './puppeteer/startPuppeteer';
import { MongoClient } from 'mongodb';

export default class StartServices {
	public startMongoDB(): Promise<MongoClient> {
		return startMongoDBService();
	}

	public startPuppeteer(): Promise<Browser> {
		return startPuppeteerService();
	}
}
