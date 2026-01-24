/**
 * Utility functions
 */

import type { StatusLineInput } from "./types.ts";

/**
 * Read and parse JSON from stdin
 */
export async function readStdin(): Promise<StatusLineInput> {
  const text = await Bun.stdin.text();
  return JSON.parse(text) as StatusLineInput;
}

/**
 * Get basename of a path
 */
export function basename(path: string): string {
  return path.split("/").pop() ?? path;
}

/**
 * Format cost in USD
 */
export function formatCost(cost: number): string {
  if (cost === 0) {
    return "$0";
  }
  if (cost < 0.01) {
    return `$${cost.toFixed(4)}`;
  }
  if (cost < 1) {
    return `$${cost.toFixed(2)}`;
  }
  return `$${cost.toFixed(2)}`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Format duration in ms to human readable
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m${remainingSeconds}s`;
}

/**
 * Format token count with K/M suffix
 */
export function formatTokens(tokens: number): string {
  if (tokens < 1000) {
    return tokens.toString();
  }
  if (tokens < 1000000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  }
  return `${(tokens / 1000000).toFixed(2)}M`;
}

/**
 * Get git branch name (sync, for speed)
 */
export function getGitBranch(cwd: string): string | null {
  try {
    const headFile = Bun.file(`${cwd}/.git/HEAD`);
    // Use sync read for performance in statusline
    const content = require("fs").readFileSync(`${cwd}/.git/HEAD`, "utf8").trim();
    if (content.startsWith("ref: refs/heads/")) {
      return content.replace("ref: refs/heads/", "");
    }
    // Detached HEAD - return short hash
    return content.slice(0, 7);
  } catch {
    return null;
  }
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 1) + "…";
}

/**
 * Convert path to ~/xxx format
 */
export function shortPath(path: string): string {
  const home = process.env.HOME || process.env.USERPROFILE || "";
  if (home && path.startsWith(home)) {
    return "~" + path.slice(home.length);
  }
  return path;
}
