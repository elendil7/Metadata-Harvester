import { getEvents } from '../utils/getFiles';
import DiscordBot from '../structures/client';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

const bootstrapEvents = async (client: DiscordBot, searchDir: string) => {
	try {
		// get all file names of events from imported function
		const eventNames = await getEvents(searchDir);

		// if event file names were fetched
		if (eventNames) {
			// loop through event file names
			for (let i = 0; i < eventNames.length; ++i) {
				// get event name
				const eventName = eventNames[i];
				const curEvent = (await import(`./${eventName}`))?.default;
				if (curEvent.once) {
					// if even only requires to be triggered once
					client.once(curEvent.name, (...args) =>
						curEvent.run(client, ...args)
					);
				} else {
					// otherwise expect event to be triggered multiple times
					client.on(curEvent.name, (...args) =>
						curEvent.run(client, ...args)
					);
				}
				// add the event object to the collection of events, to be accessed anytime
				client.events.set(eventName, curEvent);

				// console.log(this.events);
			}
			LOG('Events loaded.');
		} else {
			// if no events were fetched, send error message
			LOG('No events found.');
		}
	} catch (e) {
		LOG(e);
	}
};

export default bootstrapEvents;
