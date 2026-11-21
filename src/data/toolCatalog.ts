import toolCatalogJson from "./toolCatalog.json";

type ToolCatalogItem = {
  name: string;
  logo: string | null;
  description: string;
};

export const toolCatalog = toolCatalogJson as Record<string, ToolCatalogItem>;

export const aiToolKeys = [
  "claude-ai",
  "claude-code",
  "codex",
  "cursor",
  "github-copilot",
  "muse",
  "openai",
] as const satisfies readonly (keyof typeof toolCatalogJson)[];
