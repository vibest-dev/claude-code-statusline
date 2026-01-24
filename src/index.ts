/**
 * Claude Code Statusline
 *
 * A customizable statusline for Claude Code CLI
 */

// Types
export type { StatusLineInput, Model, Workspace, Cost, ContextWindow, CurrentUsage } from "./types.ts";

// Colors (picocolors)
export { colors } from "./colors.ts";
export {
  bold,
  dim,
  italic,
  underline,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
} from "./colors.ts";

// Utilities
export {
  readStdin,
  basename,
  formatCost,
  formatPercent,
  formatTokens,
  formatDuration,
  getGitBranch,
  truncate,
} from "./utils.ts";

// Widgets
export {
  type Widget,
  modelWidget,
  directoryWidget,
  projectWidget,
  gitWidget,
  costWidget,
  contextWidget,
  tokensWidget,
  linesWidget,
  durationWidget,
  versionWidget,
  separator,
  powerlineSeparator,
} from "./widgets.ts";
