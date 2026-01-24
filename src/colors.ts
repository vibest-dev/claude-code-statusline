/**
 * Color Utilities - using picocolors with forced color support
 */

import { createColors } from "picocolors";

// Force colors enabled (Claude Code statusline always runs in a TTY context)
const pc = createColors(true);

export { pc as colors };

// Re-export commonly used functions
export const {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
} = pc;
