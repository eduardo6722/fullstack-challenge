import z from "zod";

function fieldIsRequired(field: string) {
  return `${field} is required!`;
}

export const createCarSchema = z.object({
  id: z.string({ error: fieldIsRequired("ID") }),
  make: z.string({ error: fieldIsRequired("make") }),
  model: z.string({ error: fieldIsRequired("model") }),
  year: z.string({ error: fieldIsRequired("year") }),
  color: z.string({ error: fieldIsRequired("color") }),
  mobile: z.string({ error: fieldIsRequired("mobile") }),
  tablet: z.string({ error: fieldIsRequired("tablet") }),
  desktop: z.string({ error: fieldIsRequired("desktop") }),
});
