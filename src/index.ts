import compose, { ComposedMiddleware } from 'koa-compose';
import Store from './store';
import { IContext } from './interfaces';

const GET = Symbol('ComposedStore#get');

interface IStoreOptions<K, V> {
  stores: Store<K, V>[];
}

class ComposedStore<K = string, V = Buffer> extends Store<K, V> {
  _stores: Store<K, V>[];
  [GET]: ComposedMiddleware<IContext<K, V>>;

  constructor(opts?: IStoreOptions<K, V>) {
    super();

    this._stores = [];
    if (opts?.stores) {
      for (const store of opts.stores) {
        this.add(store);
      }
    }
  }

  get length() {
    return this._stores.length;
  }

  add(store: Store<K, V>) {
    this._stores.push(store);
  }

  async get(ctx: IContext<K, V>, next?: () => Promise<void>) {
    let handler = this[GET];
    if (!handler) {
      const handlers = this._stores.map(store => store.get.bind(store));
      handler = this[GET] = compose(handlers);
    }
    await handler(ctx, next);
    return ctx.body;
  }

  async set(key: K, value: V) {
    for (const store of this._stores) {
      await store.set(key, value);
    }
  }

  async clear(key?: K) {
    // 倒序删除缓存
    for (let i = this.length - 1; i >= 0; i--) {
      const store = this._stores[i];
      await store.clear(key);
    }
  }
}

const createStore: <K = string, V = Buffer>(opts?: IStoreOptions<K, V>) => ComposedStore<K, V> = opts => {
  return new ComposedStore(opts);
};

export {
  createStore,
  ComposedStore,
  Store,
};
