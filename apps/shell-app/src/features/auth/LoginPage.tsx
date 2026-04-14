import { useNavigate } from "@tanstack/react-router";
import { Button, Card } from "@pulseboard/shared-ui";
import { useSessionStore } from "../../store/sessionStore";
import { ORGANIZATIONS, type Session } from "@pulseboard/shared-core";

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useSessionStore((s) => s.setSession);

  const signIn = () => {
    const session: Session = {
      userId: "user_1",
      email: "owner@acme.com",
      name: "Workspace Owner",
      role: "Owner",
      activeOrgId: ORGANIZATIONS[0].id,
      planTier: ORGANIZATIONS[0].planTier,
    };
    setSession(session);
    navigate({ to: "/overview" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card title="Sign in to PulseBoard">
        <div className="space-y-3">
          <input className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white" placeholder="Email" />
          <input className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white" placeholder="Password" type="password" />
          <Button className="w-full" onClick={signIn}>
            Continue
          </Button>
        </div>
      </Card>
    </main>
  );
}
