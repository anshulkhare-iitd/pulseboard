import { useState } from "react";
import { Badge, Button, Card } from "@pulseboard/shared-ui";

export function SettingsModule() {
  const [theme, setTheme] = useState("system");
  const audit = [
    "Billing plan changed to Enterprise",
    "Workspace policy updated by Admin",
    "API key rotated 2 hours ago",
  ];

  return (
    <div className="space-y-4">
      <Card title="Organization profile">
        <p className="text-sm text-slate-300">PulseBoard Inc · enterprise plan</p>
      </Card>
      <Card title="Billing and plan">
        <div className="flex items-center justify-between">
          <Badge tone="success">Enterprise</Badge>
          <Button variant="secondary">Manage billing</Button>
        </div>
      </Card>
      <Card title="Theme preference">
        <div className="flex items-center gap-2">
          {["light", "dark", "system"].map((item) => (
            <Button key={item} variant={theme === item ? "primary" : "secondary"} onClick={() => setTheme(item)}>
              {item}
            </Button>
          ))}
        </div>
      </Card>
      <Card title="Audit log">
        <ul className="space-y-2 text-sm text-slate-300">
          {audit.map((item) => (
            <li key={item} className="rounded-md bg-slate-800 p-2">
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
