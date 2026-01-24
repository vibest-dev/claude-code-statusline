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
    "command": "claude-code-statusline"
  }
}
```

## Output

```
[Opus 4.5] █████░░░░░ 45% ∣ $0.52
~/Code/my-project (main +123 -45)
```

## Programmatic Usage

```typescript
import {
  readStdin,
  modelWidget,
  costWidget,
  contextWidget,
  projectGitWidget,
} from "@vibest/claude-code-statusline";

const data = await readStdin();
console.log(modelWidget(data));
console.log(projectGitWidget(data));
```

## Available Widgets

- `modelWidget` - Model name with brackets (e.g., `[Opus 4.5]`)
- `contextWidget` - Context window progress bar and percentage
- `projectGitWidget` - Project path with git branch and changes
- `costWidget` - Total cost in USD
- `directoryWidget` - Current directory
- `gitWidget` - Git branch name

## License

MIT
