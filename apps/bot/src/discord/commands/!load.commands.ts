import debugPath from '../../utils/debugPath';
import DiscordBot from '../structures/client';
import { getCommands } from '../utils/methods/getFiles';
const LOG = debugPath(__filename);

const bootstrapCommands = async (client: DiscordBot, searchDir: string) => {
	try {
		// get collection of commandgroups & commands
		const commandGroups = await getCommands(searchDir);

		// console.log(commandGroups);

		// if any commands exist
		if (commandGroups) {
			// iterate through command groups
			for (const [cGroup, vCmds] of commandGroups) {
				// iterate through all commands in current group
				for (let i = 0; i < vCmds.length; ++i) {
					// import current command in group
					const curCommand = (
						await import(`../${searchDir}/${cGroup}/${vCmds[i]}`)
					)?.default;

					// add command name & full command to "commands" field of type "collection"
					// differnet methods depending on whether its a regular or slash command
					switch (searchDir) {
						case 'commands':
							client.commands.set(vCmds[i], new curCommand());
							break;
						case 'slashcommands':
							client.slashCommands.set(vCmds[i], curCommand);
							break;
					}
					// console.log(vCmds[i], curCommand);
				}
			}

			LOG(`${searchDir[0].toUpperCase() + searchDir.slice(1)} loaded.`);
		} else {
			LOG(`No ${searchDir} found.`);
		}
	} catch (e) {
		LOG(e);
	}
};

export default bootstrapCommands;
