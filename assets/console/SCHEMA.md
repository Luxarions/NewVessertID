# Schema

## .console.json
{
  "name": "string",
  "version": "string",
  "author": "string",
  "license": "string",
  "description": "string",
  "extends": "string|null",
  "theme": "string",
  "layout": "string",
  "keymap": "string",
  "locale": "string",
  "font": { "family": "string", "size": 13, "lineHeight": 1.5, "weight": 400 },
  "levels": {
    "log":   { "color": "#c9d1d9", "prefix": "", "icon": "log" },
    "info":  { "color": "#58a6ff", "prefix": "[INFO]", "icon": "info" },
    "warn":  { "color": "#d29922", "prefix": "[WARN]", "icon": "warn" },
    "error": { "color": "#f85149", "prefix": "[ERROR]", "bold": true, "icon": "error" },
    "debug": { "color": "#8b949e", "prefix": "[DEBUG]", "italic": true, "icon": "debug" },
    "trace": { "color": "#6e7681", "prefix": "[TRACE]", "underline": true, "icon": "debug" }
  },
  "features": {
    "timestamp": true,
    "timestampFormat": "HH:mm:ss.SSS",
    "stackTrace": true,
    "maxLines": 10000,
    "autoScroll": true
  },
  "shortcuts": { "clear": "Ctrl+L" }
}

## .layout.json
{
  "name": "string",
  "position": "inline|overlay|docked|fullscreen",
  "anchor": "top|bottom|left|right|center",
  "width": "string|number",
  "height": "string|number",
  "resizable": true,
  "draggable": false,
  "collapsible": true,
  "padding": 8,
  "border": "1px solid #30363d",
  "zIndex": 1000
}

## theme.json
{
  "name": "string",
  "author": "string",
  "license": "string",
  "source": "string",
  "colors": { "background": "#0d1117", "foreground": "#c9d1d9" },
  "levels": { "log": "#c9d1d9", "info": "#58a6ff" }
}

## .keymap.json
{ "name": "string", "bindings": { "Ctrl+L": "clear" } }

## .locale.json
{ "name": "string", "strings": { "console.title": "Console" } }
