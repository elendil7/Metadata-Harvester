import { CommandInteraction, Message } from 'discord.js';
import { getEnv } from './getEnv';

// * For discord bot
// main
export const DISCORD_BOT_TOKEN = getEnv('DISCORD_BOT_TOKEN');
export const DISCORD_BOT_ID = getEnv('DISCORD_BOT_ID');
export const DISCORD_BOT_PREFIX = getEnv('DISCORD_BOT_PREFIX');
export const DISCORD_OWNER_ID = getEnv('DISCORD_OWNER_ID');
// register slash commands
export const DISCORD_GUILD_ID = getEnv('DISCORD_GUILD_ID');
export const REGISTER_GUILD_SLASH_COMMANDS = getEnv(
	'REGISTER_GUILD_SLASH_COMMANDS'
);
export const REGISTER_GLOBAL_SLASH_COMMANDS = getEnv(
	'REGISTER_GLOBAL_SLASH_COMMANDS'
);

// * For database

// * Typescript
// Custom types
export type numberORstring = number | string;
export type messageORinteraction = CommandInteraction | Message; // for passing either message/interaction into embed constructor

// * Miscellaneous
// Colours
export enum Colour_Hex {
	RED = '#F4070D',
	GREEN = '#95F3E3',
	BlUE = '#08C4CD',
	ORANGE = '#FE902E',
	DARK_RED = '#D22426',
	DARK_GREEN = '#71CFB7',
	DARK_BLUE = '#27939D',
	DARK_ORANGE = '#EE6B35',
}

export enum Colour_Codes {
	DEFAULT = 0,
	AQUA = 1752220,
	DARKAQUA = 1146986,
	GREEN = 5763719,
	DARKGREEN = 2067276,
	BLUE = 3447003,
	DARKBLUE = 2123412,
	PURPLE = 10181046,
	DARKPURPLE = 7419530,
	LUMINOUSVIVIDPINK = 15277667,
	DARKVIVIDPINK = 11342935,
	GOLD = 15844367,
	DARKGOLD = 12745742,
	ORANGE = 15105570,
	DARKORANGE = 11027200,
	RED = 15548997,
	DARKRED = 10038562,
	GREY = 9807270,
	DARKGREY = 9936031,
	DARKERGREY = 8359053,
	LIGHTGREY = 12370112,
	NAVY = 3426654,
	DARKNAVY = 2899536,
	YELLOW = 16776960,
}

// Symbols
export enum Symbols {
	SUCCESS = '✔️',
	SUCCESS_VARIATION = '✅',
	FAILURE = `❌`,
	LOADING = `⌛`,
	BUG = '🐛',
	BOAR = '🐗',
	DUCK = '🦆',
	STAR = '⭐',
	LANGUAGE = '🔤',
	USER = '👤',
	BOT = '🤖',
	WEIGHTLIFTING = '🏋️',
	CALENDAR = '📅',
	TABLE_TENNIS = '🏓',
}

// Time values
export enum Convert_MS {
	MS = 1,
	SECS = 1000,
	MINS = 60000,
	HOURS = 3600000,
	DAYS = 86400000,
	WEEKS = 604800000,
	MONTHS = 2592000000,
	YEARS = 31536000000,
}

// Image sizes available for serving by Discord
export enum Images_Sizes {
	MICROSCROPIC = '8',
	MINISCULE = '16',
	TINY = '32',
	SMALL = '64',
	MEDIUM = '128',
	LARGE = '256',
	XLARGE = '512',
	XXLARGE = '1024',
	XXXLARGE = '2048',
	XXXXLARGE = '4096',
}

// Links to external GIFs stored remotely in CDNs or simply websites
export enum Gif_Links {
	ANIMATED_CHECKMARK = 'https://cdn.discordapp.com/emojis/723073203307806761.gif?v=1',
}
