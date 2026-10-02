import { JSONLoader } from '../../../src/loaders/JSONLoader.js';
import { ThemeParser } from '../../../src/parsers/ThemeParser.js';
import { PATHS } from '../../../src/constants.js';

class ThemeLoader {
  constructor() { this.loader = new JSONLoader(); }
  async load(name) {
    const json = await this.loader.load(`${PATHS.THEMES}/${name}.json`);
    return ThemeParser.parse(json);
  }
}

export { ThemeLoader };
