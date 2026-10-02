import { JSONLoader } from '../../../src/loaders/JSONLoader.js';
import { LayoutParser } from '../../../src/parsers/LayoutParser.js';
import { PATHS } from '../../../src/constants.js';

class LayoutLoader {
  constructor() { this.loader = new JSONLoader(); }
  async load(name) {
    const json = await this.loader.load(`${PATHS.LAYOUTS}/${name}.json`);
    return LayoutParser.parse(json);
  }
}

export { LayoutLoader };
