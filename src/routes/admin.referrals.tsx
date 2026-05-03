import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/brainexa/DashboardLayout";
import {
  referrals,
  referralCommissions,
  users,
  referralRates,
} from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/referrals")({
  component: AdminReferrals,
});

const NAV = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/teachers", label: "Teachers" },
  { to: "/admin/referrals", label: "Referrals" },
  { to: "/admin/withdrawals", label: "Withdrawals" },
];

function AdminReferrals() {
  const [, force] = useState(0);
  const refresh = () => force((x) => x + 1);
  const userName = (id: string) => users.find((u) => u.id === id)?.name ?? id;

  const togglePaid = (id: string) => {
    const c = referralCommissions.find((x) => x.id === id);
    if (c) c.status = c.status === "paid" ? "pending" : "paid";
    refresh();
  };

  return (
    <DashboardLayout title="Referrals" nav={NAV} requireRole="admin">
      <h1 className="text-2xl font-bold mb-4">Referral Management</h1>

      <Card className="mb-6">
        <CardHeader><CardTitle>Commission Rates</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Rate label="Direct (L1)" rateKey="L1" />
          <Rate label="Level 2" rateKey="L2" />
          <Rate label="Level 3" rateKey="L3" />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle>Referral Network</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Referrer</TableHead><TableHead>Referee</TableHead><TableHead>Level</TableHead></TableRow></TableHeader>
            <TableBody>
              {referrals.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{userName(r.referrerId)}</TableCell>
                  <TableCell>{userName(r.refereeId)}</TableCell>
                  <TableCell><Badge>L{r.level}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Commissions</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Referrer</TableHead><TableHead>Level</TableHead><TableHead>%</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {referralCommissions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{userName(c.referrerId)}</TableCell>
                  <TableCell><Badge>L{c.level}</Badge></TableCell>
                  <TableCell>{c.percent}%</TableCell>
                  <TableCell>₹{c.amount}</TableCell>
                  <TableCell><Badge variant={c.status === "paid" ? "default" : "secondary"}>{c.status}</Badge></TableCell>
                  <TableCell><Button size="sm" variant="outline" onClick={() => togglePaid(c.id)}>Toggle</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

function Rate({ label, rateKey }: { label: string; rateKey: "L1" | "L2" | "L3" }) {
  const [val, setVal] = useState(referralRates[rateKey]);
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <Input type="number" value={val} onChange={(e) => setVal(parseFloat(e.target.value) || 0)} />
        <Button size="sm" onClick={() => { referralRates[rateKey] = val; }}>Save</Button>
      </div>
    </div>
  );
}
