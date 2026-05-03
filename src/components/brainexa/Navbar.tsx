import { useEffect, useState } from "react";
import { Menu, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#why", label: "Why Brainexa" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

const EXTERNAL = "https://brainexa.in/";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-soft"
          : "bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft">
            <BrainCircuit className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
              BRAINEXA
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:block">
              Shaping Intelligent Futures
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <a href={EXTERNAL} target="_blank" rel="noopener noreferrer">
              Student Login
            </a>
          </Button>
          <Button
            asChild
            className="bg-gradient-gold text-gold-foreground hover:opacity-90 shadow-gold"
          >
            <a href={EXTERNAL} target="_blank" rel="noopener noreferrer">
              Enroll Now
            </a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2.5 border-b p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
                  <BrainCircuit className="h-5 w-5 text-primary-foreground" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-base font-extrabold">BRAINEXA</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Shaping Intelligent Futures
                  </span>
                </div>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 border-t p-4">
                <Button variant="outline" size="lg" asChild>
                  <a href={EXTERNAL} target="_blank" rel="noopener noreferrer">
                    Student Login
                  </a>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-gold text-gold-foreground hover:opacity-90"
                >
                  <a href={EXTERNAL} target="_blank" rel="noopener noreferrer">
                    Enroll Now
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
