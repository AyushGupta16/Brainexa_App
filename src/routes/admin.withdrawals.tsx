import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/brainexa/DashboardLayout";
import { withdrawals, users } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/withdrawals")({
  component: AdminWithdrawals,
});

const NAV = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/teachers", label: "Teachers" },
  { to: "/admin/referrals", label: "Referrals" },
  { to: "/admin/withdrawals", label: "Withdrawals" },
];

function AdminWithdrawals() {
  const [, force] = useState(0);
  const refresh = () => force((x) => x + 1);
  const userName = (id: string) => users.find((u) => u.id === id)?.name ?? id;
  const setStatus = (id: string, status: "approved" | "rejected" | "paid") => {
    const w = withdrawals.find((x) => x.id === id);
    if (w) w.status = status;
    refresh();
  };

  return (
    <DashboardLayout title="Withdrawals" nav={NAV} requireRole="admin">
      <h1 className="text-2xl font-bold mb-4">Withdrawal Requests</h1>
      <Card>
        <CardHeader><CardTitle>All Requests</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>User</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {withdrawals.map((w) => (
                <TableRow key={w.id}>
                  <TableCell>{w.date}</TableCell>
                  <TableCell>{userName(w.userId)}</TableCell>
                  <TableCell>₹{w.amount}</TableCell>
                  <TableCell><Badge variant={w.status === "paid" ? "default" : "secondary"}>{w.status}</Badge></TableCell>
                  <TableCell className="space-x-1">
                    <Button size="sm" variant="outline" onClick={() => setStatus(w.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => setStatus(w.id, "rejected")}>Reject</Button>
                    <Button size="sm" onClick={() => setStatus(w.id, "paid")}>Mark Paid</Button>
                  </TableCell>
                </TableRow>
              ))}
              {withdrawals.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No requests yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
