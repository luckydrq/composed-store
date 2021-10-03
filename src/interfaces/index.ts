interface IQuery<K> {
  key: K;
}

export interface IContext<K, V> {
  query: IQuery<K>;
  body?: V;
}
