/**
 * Claude Code Statusline Input Types
 */

export interface Model {
  id: string;
  display_name: string;
}

export interface Workspace {
  current_dir: string;
  project_dir: string;
}

export interface Cost {
  total_cost_usd: number;
  total_duration_ms: number;
  total_api_duration_ms: number;
  total_lines_added: number;
  total_lines_removed: number;
}

export interface CurrentUsage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
}

export interface ContextWindow {
  total_input_tokens: number;
  total_output_tokens: number;
  context_window_size: number;
  used_percentage: number;
  remaining_percentage: number;
  current_usage: CurrentUsage | null;
}

export interface StatusLineInput {
  hook_event_name: "Status";
  session_id: string;
  transcript_path: string;
  cwd: string;
  model: Model;
  workspace: Workspace;
  version: string;
  output_style?: {
    name: string;
  };
  cost: Cost;
  context_window: ContextWindow;
}
