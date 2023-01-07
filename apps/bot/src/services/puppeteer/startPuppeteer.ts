import { join } from 'path';
import puppeteer, { Browser } from 'puppeteer';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

export const startPuppeteerService = async (): Promise<Browser> => {
	const minimal_args = [
		'--autoplay-policy=user-gesture-required',
		'--disable-background-networking',
		'--disable-background-timer-throttling',
		'--disable-backgrounding-occluded-windows',
		'--disable-breakpad',
		'--disable-client-side-phishing-detection',
		'--disable-component-update',
		'--disable-default-apps',
		'--disable-dev-shm-usage',
		'--disable-domain-reliability',
		'--disable-extensions',
		'--disable-features=AudioServiceOutOfProcess',
		'--disable-hang-monitor',
		'--disable-ipc-flooding-protection',
		'--disable-notifications',
		'--disable-offer-store-unmasked-wallet-cards',
		'--disable-popup-blocking',
		'--disable-print-preview',
		'--disable-prompt-on-repost',
		'--disable-renderer-backgrounding',
		'--disable-setuid-sandbox',
		'--disable-speech-api',
		'--disable-sync',
		'--hide-scrollbars',
		'--ignore-gpu-blacklist',
		'--metrics-recording-only',
		'--mute-audio',
		'--no-default-browser-check',
		'--no-first-run',
		'--no-pings',
		'--no-sandbox',
		'--no-zygote',
		'--password-store=basic',
		'--use-gl=swiftshader',
		'--use-mock-keychain',
		// '--window-size=1920,1080', // set browser window size
	];

	const puppeteerBrowser = await puppeteer.launch({
		// run headless (no browser window)
		headless: true,
		// run with minimal arguments
		args: minimal_args,
		// use firefox instead of chrome
		product: 'firefox',
		// set tab window size
		/* 		defaultViewport: {
			width: 900,
			height: 700,
			isMobile: false,
			hasTouch: false,
		}, */
		// local cache for reusable CSS / JS / Image assets
		userDataDir: join(__dirname, '../../data/cache/puppeteer'),
		// don't print error info to console
		dumpio: false,
		// stop puppeteer from spamming debug messages to console
		// TODO <==
		// wait 0ms before starting browser
		timeout: 0,
		// devtools for debugging
		// devtools:false,
		// slowMo:0
	});

	LOG('Loaded puppeteer browser instance');

	return puppeteerBrowser;
};
