# composed-store
Composed store inspired by [koa-compose](https://github.com/koajs/compose)

[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/composed-store.svg?style=flat-square
[npm-url]: https://npmjs.org/package/composed-store
[download-image]: https://img.shields.io/npm/dm/composed-store.svg?style=flat-square
[download-url]: https://npmjs.org/package/composed-store

## Install
`$ npm i composed-store -S`

## Usage
```js
const { createStore } = require('composed-store');

// create store instance and compose with sub stores. 
const store = createStore();
store.add(new Store_Impl1());
store.add(new Store_Impl2());
store.add(new Store_Impl3());

// get
const value = await store.get({ query: { key: 'foo' }});

// set
await store.set('a', 'b');
```

**Notice: the first arg in .get() is wrapped as Koa-Context-Like object**
