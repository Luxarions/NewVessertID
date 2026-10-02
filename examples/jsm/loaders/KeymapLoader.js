import { JSONLoader } from '../../../src/loaders/JSONLoader.js';
import { KeymapParser } from '../../../src/parsers/KeymapParser.js';
import { PATHS } from '../../../src/constants.js';

class KeymapLoader {
  constructor() { this.loader = new JSONLoader(); }
  async load(name) {
    const json = await this.loader.load(`${PATHS.KEYMAPS}/${name}.json`);
    return KeymapParser.parse(json);
  }
}

export { KeymapLoader };
