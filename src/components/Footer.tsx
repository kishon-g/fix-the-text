import { Button } from "./ui/button";
import { IconMessage } from '@tabler/icons-react';

export function Footer() {
  return (
    <footer className="flex items-center justify-between w-full border-t border-border/60 bg-background/80 backdrop-blur-md">
      <p className="text-xs text-zinc-500">Made for messages that deserve more than a tiny text box</p>

      <Button size="icon" variant="ghost" className="cursor-pointer">
        <IconMessage />
      </Button>
    </footer>
  )
}
