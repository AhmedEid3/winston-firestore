import { Firestore } from '@google-cloud/firestore';
import Transport from 'winston-transport';

interface WinstonFirestoreOptions extends Transport.TransportStreamOptions {
  db: Firestore;
  collectionPath: string;
}

export default class WinstonFirestore extends Transport {
  constructor(public options: WinstonFirestoreOptions) {
    super(options);

    this.validateDB();
    this.validateCollectionPath();
  }

  private validateDB() {
    if (!this.options?.db) {
      throw new Error("Missing required 'db' in options");
    }
  }

  private validateCollectionPath() {
    if (!this.options?.collectionPath) {
      throw new Error("Missing required 'collectionPath' in options");
    }

    const isValidPath = this.options.collectionPath.split('/').length % 2 !== 0;
    if (!isValidPath) {
      throw new Error(
        `Value for argument "collectionPath" must point to a collection,
             but was "${this.options.collectionPath}". 
             Your path does not contain an odd number of components.`,
      );
    }
  }

  async log(info: any, next: () => void) {
    await this.options.db.collection(this.options.collectionPath).add(info);

    next?.();
  }
}
