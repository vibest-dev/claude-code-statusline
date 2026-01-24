import { test, expect, describe } from "bun:test";
import type { StatusLineInput } from "./types.ts";
import { basename, formatCost, truncate } from "./utils.ts";
import { red, bold } from "./colors.ts";
import {
  modelWidget,
  projectGitWidget,
  costWidget,
  contextWidget,
} from "./widgets.ts";

// Mock data for testing
const mockData: StatusLineInput = {
  hook_event_name: "Status",
  session_id: "test-session-123",
  transcript_path: "/tmp/transcript.json",
  cwd: "/Users/test/project",
  model: {
    id: "claude-opus-4-5",
    display_name: "Opus 4.5",
  },
  workspace: {
    current_dir: "/Users/test/project/src",
    project_dir: "/Users/test/project",
  },
  version: "1.0.0",
  cost: {
    total_cost_usd: 0.0234,
    total_duration_ms: 45000,
    total_api_duration_ms: 2300,
    total_lines_added: 156,
    total_lines_removed: 23,
  },
  context_window: {
    total_input_tokens: 15234,
    total_output_tokens: 4521,
    context_window_size: 200000,
    used_percentage: 42.5,
    remaining_percentage: 57.5,
    current_usage: {
      input_tokens: 8500,
      output_tokens: 1200,
      cache_creation_input_tokens: 5000,
      cache_read_input_tokens: 2000,
    },
  },
};

describe("utils", () => {
  test("basename extracts filename from path", () => {
    expect(basename("/Users/test/project")).toBe("project");
    expect(basename("/a/b/c")).toBe("c");
    expect(basename("single")).toBe("single");
  });

  test("formatCost formats currency correctly", () => {
    expect(formatCost(0.0001)).toBe("$0.0001");
    expect(formatCost(0.0234)).toBe("$0.023");
    expect(formatCost(1.5)).toBe("$1.50");
  });

  test("truncate shortens long strings", () => {
    expect(truncate("hello", 10)).toBe("hello");
    expect(truncate("hello world", 8)).toBe("hello w…");
  });
});

describe("colors", () => {
  test("red wraps text with ANSI codes", () => {
    const result = red("test");
    expect(result).toContain("test");
  });

  test("bold wraps text", () => {
    const result = bold("test");
    expect(result).toContain("test");
  });
});

describe("widgets", () => {
  test("modelWidget displays model name with brackets", () => {
    const result = modelWidget(mockData);
    expect(result).toContain("Opus 4.5");
    expect(result).toContain("[");
    expect(result).toContain("]");
  });

  test("projectGitWidget displays directory", () => {
    const result = projectGitWidget(mockData);
    expect(result).toContain("src");
  });

  test("costWidget displays formatted cost", () => {
    const result = costWidget(mockData);
    expect(result).toContain("$0.023");
  });

  test("contextWidget displays progress bar and percentage", () => {
    const result = contextWidget(mockData);
    expect(result).toContain("43%");
    expect(result).toContain("█");
    expect(result).toContain("░");
  });
});
