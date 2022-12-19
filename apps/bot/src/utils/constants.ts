import { getEnv } from './getEnv';

// * For discord bot
export const DISCORD_BOT_TOKEN = getEnv('DISCORD_BOT_TOKEN');
export const DISCORD_BOT_ID = getEnv('DISCORD_BOT_ID');
export const DISCORD_BOT_PREFIX = getEnv('DISCORD_BOT_PREFIX');
export const DISCORD_OWNER_ID = getEnv('DISCORD_OWNER_ID');
export const DISCORD_GUILD_ID = getEnv('DISCORD_GUILD_ID');

// * For database

// Colours
export enum Colors {
	RED = '#F4070D',
	GREEN = '#95F3E3',
	BlUE = '#08C4CD',
	ORANGE = '#FE902E',
	DARK_RED = '#D22426',
	DARK_GREEN = '#71CFB7',
	DARK_BLUE = '#27939D',
	DARK_ORANGE = '#EE6B35',
}

// Symbols
export enum Symbols {
	SUCCESS = '✔️',
	FAILURE = `❌`,
	LOADING = `⌛`,
}

// Time values
export enum Convert_MS {
	ms = 1,
	secs = 1000,
	mins = 60000,
	minutes = 60000,
	hours = 3600000,
	days = 86400000,
	weeks = 604800000,
	months = 2592000000,
	years = 31536000000,
}
