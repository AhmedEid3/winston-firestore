# @winston-transports/firestore

[Firestore](https://firebase.google.com/docs/firestore) transport for [winston logger](https://www.npmjs.com/package/winston)

[![npm version](https://img.shields.io/npm/v/@winston-transports/firestore.svg?style=flat)](https://npmjs.org/package/@winston-transports/firestore "View this project on npm")

### Installing @winston-transports/firestore
`npm i @winston-transports/firestore`

## Usage
``` js
import { getFirestore } from 'firebase-admin/firestore';
import { WinstonFirestore } from '@winston-transports/firestore';
import winston, { format } from 'winston';

.....
const firestoreDB = getFirestore();
.....

const logger = winston.createLogger({
	level: 'info',
	transports: [
		.....
		new WinstonFirestore({
            // Firestore reference
			db:firestoreDB,                    
            // Path of collection EX: "Logs" or "Logs/docId/CollectionName"
            // Should path end of collectionName not docId
			collectionPath: 'Logs', 
		})
		.....
	]
});

logger.error('Hello World', {
	meta1: 1,
	meta2: 'string',
	meta3: {deepObj: 1}
});

```

## Typescript Support
@winston-transports/firestore comes with its' own type definitions, so you wont have to use [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

### Author: [Ahmed Eid](https://github.com/AhmedEid3)
