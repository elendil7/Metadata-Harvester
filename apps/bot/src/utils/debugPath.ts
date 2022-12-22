import debug from 'debug';
const ironicLOG = debug('debugPath.ts');
const rootDirName = process.cwd();

const debugPath = (path: string) => {
	try {
		return debug(path.split(rootDirName)[1].replace(/\\/g, ':'));
	} catch (e) {
		return debug(
			`How ironic. He could save others from errors, but not himself.\n${e}`
		);
	}
};

export default debugPath;
