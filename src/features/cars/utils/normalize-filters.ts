export function normalizeFilters(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (!value) return undefined;
  if (value === "All") return undefined;
  return value.trim();
}
