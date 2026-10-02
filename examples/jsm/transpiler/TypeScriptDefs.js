class TypeScriptDefs {
  static fromConsoleSchema() {
    return `
export interface VessertConsoleConfig {
  name: string;
  version: string;
  author: string;
  license: string;
  theme: string;
  layout: string;
  keymap: string;
  locale: string;
  levels: Record<string, VessertLevelConfig>;
  features: VessertFeatureConfig;
  shortcuts: Record<string, string>;
}

export interface VessertLevelConfig {
  color: string;
  background?: string;
  prefix?: string;
  suffix?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  icon?: string;
}

export interface VessertFeatureConfig {
  timestamp?: boolean;
  timestampFormat?: string;
  stackTrace?: boolean;
  groupIndent?: number;
  clearOnReload?: boolean;
  maxLines?: number;
  maxHistory?: number;
  autoScroll?: boolean;
  wrapLines?: boolean;
  showLineNumbers?: boolean;
  showSource?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  exportable?: boolean;
  copyable?: boolean;
}
`;
  }
}

export { TypeScriptDefs };
