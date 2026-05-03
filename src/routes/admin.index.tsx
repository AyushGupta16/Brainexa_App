import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/brainexa/DashboardLayout";
import {
  courses,
  users,
  enrollments,
  referralCommissions,
  withdrawals,
  doubts,
} from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Wallet, TrendingUp, Share2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const NAV = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/teachers", label: "Teachers" },
  { to: "/admin/referrals", label: "Referrals" },
  { to: "/admin/withdrawals", label: "Withdrawals" },
];

function AdminDashboard() {
  const totalRevenue = enrollments.reduce((a, e) => a + e.amount, 0);
  const totalCommissions = referralCommissions.reduce((a, c) => a + c.amount, 0);
  const studentCount = users.filter((u) => u.role === "student").length;
  const teacherCount = users.filter((u) => u.role === "teacher").length;
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending").length;
  const pendingDoubts = doubts.filter((d) => d.status === "pending").length;

  return (
    <DashboardLayout title="Admin" nav={NAV} requireRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={<BookOpen className="h-5 w-5" />} label="Courses" value={courses.length.toString()} />
          <Stat icon={<Users className="h-5 w-5" />} label="Students" value={studentCount.toString()} />
          <Stat icon={<Users className="h-5 w-5" />} label="Teachers" value={teacherCount.toString()} />
          <Stat icon={<TrendingUp className="h-5 w-5" />} label="Total Revenue" value={`₹${totalRevenue}`} />
          <Stat icon={<Wallet className="h-5 w-5" />} label="Referral Commissions" value={`₹${totalCommissions}`} />
          <Stat icon={<Share2 className="h-5 w-5" />} label="Pending Withdrawals" value={pendingWithdrawals.toString()} />
          <Stat icon={<MessageCircle className="h-5 w-5" />} label="Pending Doubts" value={pendingDoubts.toString()} />
        </div>

        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild><Link to="/admin/courses">Manage Courses</Link></Button>
            <Button asChild variant="outline"><Link to="/admin/teachers">Teachers & Commissions</Link></Button>
            <Button asChild variant="outline"><Link to="/admin/referrals">Referrals</Link></Button>
            <Button asChild variant="outline"><Link to="/admin/withdrawals">Withdrawals</Link></Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card><CardContent className="p-4 flex items-center gap-3">
      <div className="bg-primary/10 text-primary p-2 rounded-md">{icon}</div>
      <div><div className="text-xs text-muted-foreground">{label}</div><div className="text-xl font-bold">{value}</div></div>
    </CardContent></Card>
  );
}
