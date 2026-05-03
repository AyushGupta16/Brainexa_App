import { PlayCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const EXTERNAL = "https://brainexa.in/";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-elevated md:hidden">
      <div className="flex gap-2 p-3">
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 flex-1 border-2 border-foreground/15"
        >
          <a href={EXTERNAL} target="_blank" rel="noopener noreferrer">
            <PlayCircle className="h-4 w-4" />
            Demo
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          className="h-12 flex-1 bg-gradient-gold text-gold-foreground hover:opacity-90 shadow-gold"
        >
          <a href={EXTERNAL} target="_blank" rel="noopener noreferrer">
            <ShoppingBag className="h-4 w-4" />
            Buy ₹299
          </a>
        </Button>
      </div>
    </div>
  );
}
