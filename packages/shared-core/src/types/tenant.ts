export type Organization = {
  id: string;
  name: string;
  slug: string;
  planTier: "Free" | "Pro" | "Enterprise";
};

export const ORGANIZATIONS: Organization[] = [
  { id: "org_1", name: "Acme Corp", slug: "acme", planTier: "Enterprise" },
  { id: "org_2", name: "Nova Labs", slug: "nova", planTier: "Pro" },
];
