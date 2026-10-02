import { JSONLoader } from '../../../src/loaders/JSONLoader.js';
import { ConsoleParser } from '../../../src/parsers/ConsoleParser.js';
import { PATHS } from '../../../src/constants.js';

class PresetLoader {
  constructor(registry = {}) { this.loader = new JSONLoader(); this.registry = registry; }
  async load(name) {
    const json = await this.loader.load(`${PATHS.PRESETS}/${name}.console.json`);
    return ConsoleParser.resolveExtends(json, this.registry);
  }
}

export { PresetLoader };
