// * docs: https://pm2.keymetrics.io/docs/usage/application-declaration/

export const apps = [
	{
		name: 'metadata-harvester',
		script: './src/index.ts',
		watch: true,
		ignore_watch: ['node_modules', 'src/data'],
		autorestart: true,
		log: './src/data/logs/pm2',
		merge_logs: true,
		args: ['--update-env'],
	}, // equivalent to: "pm2 start src/index.ts --name metadata-harvester --update-env --log src/data/logs/pm2/ --watch src --ignore-watch node_modules,src/data", but must use ecosystem.config.js as normal pm2 is buggy as hell.
];
