import { createStore } from '..';
import StoreImpl from './store_impl';

const store1 = new StoreImpl();
const store2 = new StoreImpl();

beforeEach(async () => {
  await store1.clear();
  await store2.clear();
});

test('createStore with no args', () => {
  const composedStore = createStore();
  expect(composedStore._stores.length).toBe(0);
});

test('createStore with `stores` field', () => {
  const composedStore = createStore({ stores: [ store1, store2 ] });
  expect(composedStore._stores.length).toBe(2);
});

test('should get key', async () => {
  const composedStore = createStore<string, string>();
  composedStore.add(store1);
  const key = 'foo';
  const value = 'bar';
  await store1.set(key, value);
  const result = await composedStore.get({ query: { key } });
  expect(result).toBe(value);
});

test('should get by order', async () => {
  const composedStore = createStore<string, string>();
  composedStore.add(store1);
  composedStore.add(store2);
  const key = 'foo';
  const value1 = 'bar1';
  const value2 = 'bar2';
  await store1.set(key, value1);
  await store2.set(key, value2);
  const result = await composedStore.get({ query: { key } });
  expect(result).toBe(value1);
});

test('should get by order in onion way', async () => {
  const composedStore = createStore<string, string>();
  composedStore.add(store1);
  composedStore.add(store2);
  const key = 'foo';
  const value = 'bar';
  await store2.set(key, value);
  const result = await composedStore.get({ query: { key } });
  expect(result).toBe(value);
  const result2 = await composedStore.get({ query: { key } });
  expect(result2).toBe(`flush_${result}`);
});
