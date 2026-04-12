import { z } from "zod";

export const roleSchema = z.enum(["Owner", "Admin", "Analyst", "Viewer"]);
export type Role = z.infer<typeof roleSchema>;

export const planTierSchema = z.enum(["Free", "Pro", "Enterprise"]);
export type PlanTier = z.infer<typeof planTierSchema>;

export const sessionSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: roleSchema,
  activeOrgId: z.string(),
  planTier: planTierSchema,
});

export type Session = z.infer<typeof sessionSchema>;
