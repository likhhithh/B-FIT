import { z } from "zod";

export const SearchFoodsQuery = {
  query: z.object({
    q: z.string().optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
  }),
};
