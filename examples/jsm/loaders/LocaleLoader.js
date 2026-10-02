import { JSONLoader } from '../../../src/loaders/JSONLoader.js';
import { LocaleParser } from '../../../src/parsers/LocaleParser.js';
import { PATHS } from '../../../src/constants.js';

class LocaleLoader {
  constructor() { this.loader = new JSONLoader(); }
  async load(name) {
    const json = await this.loader.load(`${PATHS.LOCALES}/${name}.json`);
    return LocaleParser.parse(json);
  }
}

export { LocaleLoader };
