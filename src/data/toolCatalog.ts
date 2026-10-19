import toolCatalogJson from "./toolCatalog.json";

export type ToolCatalogItem = {
  name: string;
  logo: string | null;
  description: string;
};

export const toolCatalog = toolCatalogJson as Record<string, ToolCatalogItem>;

export function getToolCatalogItem(toolKey: string): ToolCatalogItem {
  return (
    toolCatalog[toolKey] ?? {
      name: toolKey,
      logo: null,
      description: "Project stack item."
    }
  );
}
