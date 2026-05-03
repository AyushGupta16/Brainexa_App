import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/brainexa/DashboardLayout";
import {
  users,
  teacherAssignments,
  courses,
  getTeacherEarnings,
} from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/teachers")({
  component: AdminTeachers,
});

const NAV = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/teachers", label: "Teachers" },
  { to: "/admin/referrals", label: "Referrals" },
  { to: "/admin/withdrawals", label: "Withdrawals" },
];

function AdminTeachers() {
  const [, force] = useState(0);
  const teachers = users.filter((u) => u.role === "teacher");

  const updateCommission = (teacherId: string, subjectId: string, val: number) => {
    const a = teacherAssignments.find((x) => x.teacherId === teacherId && x.subjectId === subjectId);
    if (a) a.commissionPercent = val;
    force((x) => x + 1);
  };

  return (
    <DashboardLayout title="Teachers" nav={NAV} requireRole="admin">
      <h1 className="text-2xl font-bold mb-4">Teachers & Commissions</h1>
      <div className="space-y-4">
        {teachers.map((t) => {
          const e = getTeacherEarnings(t.id);
          const assigns = teacherAssignments
            .filter((a) => a.teacherId === t.id)
            .map((a) => {
              for (const c of courses)
                for (const s of c.subjects) if (s.id === a.subjectId) return { ...a, course: c, subject: s };
              return null;
            })
            .filter(Boolean);
          return (
            <Card key={t.id}>
              <CardHeader>
                <CardTitle>{t.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{t.email}</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-4 mb-4">
                  <Stat label="Sales" value={`₹${e.totalSales}`} />
                  <Stat label="Earnings" value={`₹${e.totalEarning}`} />
                  <Stat label="Paid" value={`₹${e.paid}`} />
                  <Stat label="Pending" value={`₹${e.pending}`} />
                </div>
                <Table>
                  <TableHeader><TableRow><TableHead>Course</TableHead><TableHead>Subject</TableHead><TableHead>Commission %</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {assigns.map((a) => (
                      <TableRow key={a!.subject.id}>
                        <TableCell>{a!.course.title}</TableCell>
                        <TableCell>{a!.subject.title}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            className="w-24"
                            defaultValue={a!.commissionPercent}
                            onBlur={(e) => updateCommission(t.id, a!.subject.id, parseInt(e.target.value) || 0)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="border rounded-md p-3"><div className="text-xs text-muted-foreground">{label}</div><div className="font-bold">{value}</div></div>;
}
