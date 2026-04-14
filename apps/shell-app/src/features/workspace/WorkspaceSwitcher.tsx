import { ORGANIZATIONS } from "@pulseboard/shared-core";
import { useSessionStore } from "../../store/sessionStore";

export function WorkspaceSwitcher() {
  const session = useSessionStore((s) => s.session);
  const setSession = useSessionStore((s) => s.setSession);

  return (
    <select
      className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-100"
      value={session?.activeOrgId}
      onChange={(event) => {
        if (!session) return;
        const org = ORGANIZATIONS.find((item) => item.id === event.target.value);
        if (!org) return;
        setSession({ ...session, activeOrgId: org.id, planTier: org.planTier });
      }}
    >
      {ORGANIZATIONS.map((org) => (
        <option key={org.id} value={org.id}>
          {org.name}
        </option>
      ))}
    </select>
  );
}
