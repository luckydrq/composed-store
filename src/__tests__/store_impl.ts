import { Store } from '..';
import { IContext } from '../interfaces';

export default class Store1 extends Store<string, string> {
  _cache: Map<string, string>;

  constructor() {
    super();
    this._cache = new Map();
  }

  async get(ctx: IContext<string, string>, next: () => Promise<void>) {
    const { key } = ctx.query;
    ctx.body = this._cache.get(key);
    if (ctx.body) {
      return ctx.body;
    }

    await next();

    this._cache.set(key, 'flush_' + ctx.body);
    return ctx.body;
  }

  async set(key: string, value: string) {
    this._cache.set(key, value);
  }

  async clear(key?: string) {
    if (key) {
      this._cache.delete(key);
    } else {
      this._cache.clear();
    }
  }
}
