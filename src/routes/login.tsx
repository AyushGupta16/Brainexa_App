import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrainCircuit, GraduationCap, Shield, Users } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Brainexa" },
      { name: "description", content: "Sign in to your Brainexa account to access courses, dashboard and referrals." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"student" | "teacher" | "admin">("student");
  const [email, setEmail] = useState("");

  const quickLogins = {
    student: "aman@student.in",
    teacher: "rajesh@brainexa.in",
    admin: "admin@brainexa.in",
  };

  const handleLogin = (em: string, role: "student" | "teacher" | "admin") => {
    const u = login(em, role);
    if (!u) return alert("No user found. Try a demo account.");
    if (u.role === "admin") navigate({ to: "/admin" });
    else if (u.role === "teacher") navigate({ to: "/teacher" });
    else navigate({ to: "/student" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background p-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      </div>
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="space-y-3">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary">
            ← Back to Brainexa
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
              <BrainCircuit className="h-5 w-5 text-primary-foreground" />
            </span>
            <CardTitle className="text-2xl">Sign in to Brainexa</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="student" className="text-xs sm:text-sm gap-1.5">
                <GraduationCap className="h-4 w-4" /> Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="text-xs sm:text-sm gap-1.5">
                <Users className="h-4 w-4" /> Teacher
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-xs sm:text-sm gap-1.5">
                <Shield className="h-4 w-4" /> Admin
              </TabsTrigger>
            </TabsList>
            {(["student", "teacher", "admin"] as const).map((r) => (
              <TabsContent key={r} value={r} className="space-y-3 mt-4">
                <div className="space-y-2">
                  <Label htmlFor={`email-${r}`}>Email</Label>
                  <Input
                    id={`email-${r}`}
                    type="email"
                    placeholder={quickLogins[r]}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Demo mode — any password" />
                </div>
                <Button className="w-full" onClick={() => handleLogin(email || quickLogins[r], r)}>
                  Sign in as {r}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Demo account: <span className="font-mono">{quickLogins[r]}</span>
                </p>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
