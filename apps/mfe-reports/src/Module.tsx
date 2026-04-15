import { useMemo, useState } from "react";
import { Badge, Button, Card } from "@pulseboard/shared-ui";

const allReports = [
  { id: "r1", name: "Revenue by region", status: "Ready", period: "Last 30 days" },
  { id: "r2", name: "API latency deep dive", status: "Draft", period: "Last 7 days" },
  { id: "r3", name: "Churn analysis", status: "Ready", period: "Quarter to date" },
];

export function ReportsModule() {
  const [query, setQuery] = useState("");
  const [savedFilter, setSavedFilter] = useState("all");
  const reports = useMemo(() => {
    const bySearch = allReports.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));
    if (savedFilter === "ready") return bySearch.filter((item) => item.status === "Ready");
    return bySearch;
  }, [query, savedFilter]);

  return (
    <Card title="Reports">
      <div className="mb-3 flex gap-2">
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
          placeholder="Filter reports"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={savedFilter}
          onChange={(e) => setSavedFilter(e.target.value)}
          className="rounded-md border border-slate-700 bg-slate-800 px-2 py-2 text-sm text-white"
        >
          <option value="all">All reports</option>
          <option value="ready">Ready only</option>
        </select>
        <Button variant="secondary">Export</Button>
      </div>
      <div className="space-y-2">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between rounded-md bg-slate-800 p-3">
            <div>
              <p className="font-medium text-white">{report.name}</p>
              <p className="text-xs text-slate-400">{report.period}</p>
            </div>
            <Badge tone={report.status === "Ready" ? "success" : "default"}>{report.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
