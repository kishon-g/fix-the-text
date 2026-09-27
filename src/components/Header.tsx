import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { IconBrandGithub } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconBaseline } from '@tabler/icons-react';

export function Header() {
  return (
    <header className="flex items-center justify-between sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-0">
        <IconBaseline size={35} />
        <div className="flex flex-col items-center text-sm leading-none text-foreground">
          <p>Fix the</p>
          <p className="font-semibold uppercase tracking-[0.14em]">Text</p>
        </div>
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon">
              <IconBrandGithub />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>View on GitHub</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <AnimatedThemeToggler />
          </TooltipTrigger>
          <TooltipContent>
            <span>Toggle Theme</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </header >
  )
}
