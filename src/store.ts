import EventEmitter = require('events');
import { IContext } from './interfaces';

abstract class Store<K = string, V = Buffer> extends EventEmitter {
  abstract get(ctx: IContext<K, V>, next?: () => Promise<void>): Promise<V | undefined>;
  abstract set(key: K, value: V): Promise<void>;
  abstract clear(key?: K): Promise<void>;
}

export default Store;
