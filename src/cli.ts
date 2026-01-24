#!/usr/bin/env bun
/**
 * Claude Code Statusline CLI
 */

import { readStdin } from "./utils.ts";
import {
  modelWidget,
  projectGitWidget,
  costWidget,
  contextWidget,
  separator,
} from "./widgets.ts";

const args = process.argv.slice(2);

// Help command
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Claude Code Statusline

Usage:
  claude-code-statusline

Options:
  --help, -h        Show this help message
  --version, -v     Show version

Configuration:
  Add to ~/.claude/settings.json:

  {
    "statusLine": {
      "type": "command",
      "command": "claude-code-statusline"
    }
  }
`);
  process.exit(0);
}

// Version command
if (args.includes("--version") || args.includes("-v")) {
  const pkg = await Bun.file(new URL("../package.json", import.meta.url)).json();
  console.log(pkg.version);
  process.exit(0);
}

// Main
try {
  const data = await readStdin();

  // Line 1: Model + Context + Cost
  const line1 = modelWidget(data) + " " + contextWidget(data) + separator() + costWidget(data);

  // Line 2: Project + Git
  const line2 = projectGitWidget(data);

  console.log(line1 + "\n" + line2);
} catch {
  // Silent fail - don't break Claude Code
  process.exit(1);
}
