export const SORT_BY = {
  NONE: "None",
  MODEL_ASC: "Model A-Z",
  MODEL_DESC: "Model Z-A",
  YEAR_ASC: "Oldest",
  YEAR_DESC: "Newest",
} as const;

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];

export const SORT_BY_OPTIONS = Object.values(SORT_BY);
