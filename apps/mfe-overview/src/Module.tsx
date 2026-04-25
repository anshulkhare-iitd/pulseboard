import { Card } from "@pulseboard/shared-ui";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const kpis = [
  { label: "MRR", value: "$128,400" },
  { label: "Active users", value: "7,842" },
  { label: "API usage", value: "2.3M req" },
  { label: "Error rate", value: "0.12%" },
];

const usage = [
  { day: "Mon", value: 380 },
  { day: "Tue", value: 410 },
  { day: "Wed", value: 395 },
  { day: "Thu", value: 440 },
  { day: "Fri", value: 470 },
];

export default function OverviewModule() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => (
          <Card key={item.label} title={item.label}>
            <p className="text-xl font-semibold text-white">{item.value}</p>
          </Card>
        ))}
      </div>
      <Card title="API usage trend">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usage}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
