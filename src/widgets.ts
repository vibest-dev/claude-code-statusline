/**
 * Statusline Widgets
 */

import type { StatusLineInput } from "./types.ts";
import {
  bold,
  dim,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  gray,
} from "./colors.ts";
import {
  basename,
  formatCost,
  formatPercent,
  formatTokens,
  formatDuration,
  getGitBranch,
  truncate,
  shortPath,
} from "./utils.ts";

export type Widget = (data: StatusLineInput) => string;

/**
 * Model name widget
 */
export function modelWidget(data: StatusLineInput): string {
  const name = data.model.display_name;
  return "[" + bold(cyan(name)) + "]";
}

/**
 * Directory widget
 */
export function directoryWidget(data: StatusLineInput): string {
  const dir = basename(data.workspace.current_dir);
  return blue(dir);
}

/**
 * Project directory widget
 */
export function projectWidget(data: StatusLineInput): string {
  const project = basename(data.workspace.project_dir);
  const current = basename(data.workspace.current_dir);
  if (project === current) {
    return blue(project);
  }
  return blue(`${project}/${current}`);
}

/**
 * Git branch widget (branch only)
 */
export function gitWidget(data: StatusLineInput): string {
  const branch = getGitBranch(data.cwd);
  if (!branch) {
    return "";
  }
  return magenta(` ${truncate(branch, 20)}`);
}

/**
 * Project widget with git branch
 */
export function projectGitWidget(data: StatusLineInput): string {
  const dir = shortPath(data.workspace.current_dir);
  const branch = getGitBranch(data.cwd);

  let result = blue(dir);

  if (branch) {
    result += " (" + magenta(truncate(branch, 20)) + ")";
  }

  return result;
}

/**
 * Code changes widget (lines added/removed by Claude)
 */
export function codeChangesWidget(data: StatusLineInput): string {
  const added = data.cost.total_lines_added;
  const removed = data.cost.total_lines_removed;

  if (added === 0 && removed === 0) {
    return "";
  }

  const parts: string[] = [];
  if (added > 0) {
    parts.push(green(`+${added}`));
  }
  if (removed > 0) {
    parts.push(red(`-${removed}`));
  }
  return parts.join(" ");
}

/**
 * Cost widget
 */
export function costWidget(data: StatusLineInput): string {
  const cost = data.cost.total_cost_usd;
  const formatted = formatCost(cost);

  // Color based on cost
  if (cost < 0.1) {
    return green(formatted);
  }
  if (cost < 0.5) {
    return yellow(formatted);
  }
  return red(formatted);
}

/**
 * Context usage widget with progress bar
 */
export function contextWidget(data: StatusLineInput): string {
  const percent = data.context_window.used_percentage;
  const percentInt = Math.round(percent);

  // Progress bar: 10 chars total
  const filled = Math.round(percent / 10);
  const empty = 10 - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);

  // Color based on usage
  if (percent < 50) {
    return green(bar) + " " + green(`${percentInt}%`);
  }
  if (percent < 80) {
    return yellow(bar) + " " + yellow(`${percentInt}%`);
  }
  return red(bar) + " " + red(`${percentInt}%`);
}

/**
 * Token count widget
 */
export function tokensWidget(data: StatusLineInput): string {
  const input = formatTokens(data.context_window.total_input_tokens);
  const output = formatTokens(data.context_window.total_output_tokens);
  return gray(`↓${input}`) + " " + gray(`↑${output}`);
}

/**
 * Lines changed widget (standalone, without git)
 */
export function linesWidget(data: StatusLineInput): string {
  const added = data.cost.total_lines_added;
  const removed = data.cost.total_lines_removed;

  if (added === 0 && removed === 0) {
    return "";
  }

  const parts: string[] = [];
  if (added > 0) {
    parts.push(green(`+${added}`));
  }
  if (removed > 0) {
    parts.push(red(`-${removed}`));
  }
  return parts.join(" ");
}

/**
 * Duration widget
 */
export function durationWidget(data: StatusLineInput): string {
  const duration = formatDuration(data.cost.total_duration_ms);
  return gray(duration);
}

/**
 * Version widget
 */
export function versionWidget(data: StatusLineInput): string {
  return dim(`v${data.version}`);
}

/**
 * Separator
 */
export function separator(): string {
  return gray(" ∣ ");
}

/**
 * Powerline separator (right arrow)
 */
export function powerlineSeparator(): string {
  return gray("");
}
