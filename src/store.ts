import EventEmitter = require('events');
import { IContext } from './interfaces';

abstract class Store<K, V> extends EventEmitter {
  abstract get(ctx: IContext<K, V>, next?: () => Promise<void>): Promise<V>;
  abstract set(ctx: IContext<K, V>, value: V): Promise<void>;
  abstract clear(key?: K): Promise<void>;
}

export default Store;
