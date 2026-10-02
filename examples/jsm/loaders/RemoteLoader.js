import { JSONLoader } from '../../../src/loaders/JSONLoader.js';

class RemoteLoader {
  constructor(baseUrl) { this.baseUrl = baseUrl.replace(/\/$/, ''); this.loader = new JSONLoader(); }
  console(name) { return this.loader.load(`${this.baseUrl}/${name}.console.json`); }
  theme(name) { return this.loader.load(`${this.baseUrl}/themes/${name}.json`); }
  layout(name) { return this.loader.load(`${this.baseUrl}/layouts/${name}.json`); }
}

export { RemoteLoader };
