# @vibest/claude-code-statusline

A customizable statusline for Claude Code CLI.

## Installation

```bash
bun add -g @vibest/claude-code-statusline
```

Or with npm:

```bash
npm install -g @vibest/claude-code-statusline
```

## Configuration

Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "@vibest/claude-code-statusline --theme default"
  }
}
```

## Themes

| Theme | Description |
|-------|-------------|
| `default` | Model, directory, git, cost, context usage |
| `minimal` | Model, directory, cost |
| `full` | All information including tokens and duration |
| `dev` | Focus on code changes (lines added/removed) |
| `cost` | Focus on cost and token usage |

```bash
# List available themes
@vibest/claude-code-statusline --list-themes

# Use a specific theme
@vibest/claude-code-statusline --theme full
```

## Programmatic Usage

```typescript
import {
  readStdin,
  getTheme,
  modelWidget,
  costWidget,
  colorize,
} from "@vibest/claude-code-statusline";

// Use built-in themes
const data = await readStdin();
const theme = getTheme("default");
console.log(theme.render(data));

// Or build your own
const output = [
  modelWidget(data),
  costWidget(data),
].join(" | ");
console.log(output);
```

## Available Widgets

- `modelWidget` - Model name (e.g., `[Opus 4.5]`)
- `directoryWidget` - Current directory
- `projectWidget` - Project/current directory
- `gitWidget` - Git branch name
- `costWidget` - Total cost in USD
- `contextWidget` - Context window usage %
- `tokensWidget` - Input/output token counts
- `linesWidget` - Lines added/removed
- `durationWidget` - Session duration
- `versionWidget` - Claude Code version

## License

MIT
