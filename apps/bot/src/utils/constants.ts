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

// time values
export enum Convert_MS {
	ms = 1,
	milliseconds = 1,
	s = 1000,
	sec = 1000,
	secs = 1000,
	second = 1000,
	seconds = 1000,
	m = 60000,
	min = 60000,
	mins = 60000,
	minute = 60000,
	minutes = 60000,
	h = 3600000,
	hour = 3600000,
	hours = 3600000,
	d = 86400000,
	day = 86400000,
	days = 86400000,
	w = 604800000,
	week = 604800000,
	weeks = 604800000,
	mon = 2592000000,
	month = 2592000000,
	months = 2592000000,
	y = 31536000000,
	year = 31536000000,
	years = 31536000000,
}
