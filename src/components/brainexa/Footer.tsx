import { BrainCircuit, Youtube, Instagram, Facebook, Send, MessageCircle } from "lucide-react";

const EXTERNAL = "https://brainexa.in/";

const QUICK_LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "About Us", href: "#why" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: EXTERNAL },
];

const LEGAL = [
  { label: "Privacy Policy", href: EXTERNAL },
  { label: "Terms and Conditions", href: EXTERNAL },
  { label: "Refund Policy", href: EXTERNAL },
];

const SOCIALS = [
  { label: "WhatsApp", icon: MessageCircle, href: "https://chat.whatsapp.com/GsimlmjDJli0COBP9852Er" },
  { label: "Telegram", icon: Send, href: "https://t.me/BRAINEXA" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com/@brainexaofficial34" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/sanjeevgupta34v" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1HdHGUvTW4/" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                <BrainCircuit className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-extrabold">BRAINEXA</span>
                <span className="text-[10px] uppercase tracking-wider text-navy-foreground/60">
                  Shaping Intelligent Futures
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-foreground/70">
              Class 9 & 10 Science complete preparation — concept-first lessons,
              quizzes, notes and doubt support designed to help students score
              their best in board exams.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-navy-foreground/80 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-gold"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-navy-foreground/70 transition-colors hover:text-navy-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-navy-foreground/70 transition-colors hover:text-navy-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-navy-foreground/60 sm:text-left">
          © 2026 BRAINEXA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
