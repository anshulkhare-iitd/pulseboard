import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Card } from "@pulseboard/shared-ui";

type User = { id: string; name: string; email: string; role: string; active: boolean };

const initialUsers: User[] = [
  { id: "u1", name: "Maya Ali", email: "maya@acme.com", role: "Admin", active: true },
  { id: "u2", name: "Jon Park", email: "jon@acme.com", role: "Analyst", active: true },
  { id: "u3", name: "Rina Shaw", email: "rina@acme.com", role: "Viewer", active: false },
];

export function UsersModule() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(handle);
  }, [search]);

  const filtered = useMemo(
    () => users.filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(debouncedSearch.toLowerCase())),
    [debouncedSearch, users],
  );
  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card title="Users">
      <div className="mb-3 flex items-center justify-between gap-2">
        <input
          className="w-full max-w-xs rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() =>
            setUsers((prev) => [
              ...prev,
              { id: crypto.randomUUID(), name: "New Member", email: "new@acme.com", role: "Viewer", active: true },
            ])
          }
        >
          Invite user
        </Button>
      </div>
      <div className="space-y-2">
        {pageItems.map((user) => (
          <div key={user.id} className="flex items-center justify-between rounded-md bg-slate-800 p-3">
            <div>
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={user.active ? "success" : "warning"}>{user.active ? "Active" : "Suspended"}</Badge>
              <span className="text-sm text-slate-300">{user.role}</span>
              <Button
                variant="secondary"
                onClick={() => {
                  setUsers((prev) =>
                    prev.map((item) => (item.id === user.id ? { ...item, active: !item.active } : item)),
                  );
                }}
              >
                Toggle
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button variant="secondary" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </Button>
        <span className="text-sm text-slate-400">
          {page} / {totalPages}
        </span>
        <Button variant="secondary" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          Next
        </Button>
      </div>
    </Card>
  );
}
