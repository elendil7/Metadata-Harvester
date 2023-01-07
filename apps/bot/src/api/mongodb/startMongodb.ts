import { MongoClient } from 'mongodb';
import { MONGO_HOSTNAME, MONGO_PORT } from '../../utils/constants';
import debugPath from '../../utils/debugPath';
const LOG = debugPath(__filename);

export const startMongoDBService = async (): Promise<MongoClient> => {
	const uri = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`;

	const mongodb = new MongoClient(uri);
	await mongodb.connect();

	LOG(
		`Connected to MongoDB at hostname ${MONGO_HOSTNAME} and port ${MONGO_PORT}`
	);

	return mongodb;
};
