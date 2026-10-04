import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { IconBrandGithub, IconBaseline } from "@tabler/icons-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PlatformSelector } from "@/components/platforms"

export interface HeaderProps {
  platform?: string
  onPlatformChange?: (platform: string) => void
}

export function Header({ platform = "whatsapp", onPlatformChange }: HeaderProps) {
  return (
    <header className="relative flex items-center justify-between sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md shrink-0 py-2.5 px-2">
      <div className="flex items-center gap-1.5 select-none">
        <IconBaseline size={32} className="text-foreground" />
        <div className="flex flex-col text-sm leading-none text-foreground">
          <p className="text-xs text-muted-foreground font-medium">Fix the</p>
          <p className="font-bold uppercase tracking-[0.14em]">Text</p>
        </div>
      </div>

      {/* Floating Center Platform Selector: half inside header, half extending below with overlay */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 z-40">
        <PlatformSelector platform={platform} onPlatformChange={onPlatformChange} />
      </div>

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
              >
                <IconBrandGithub size={20} />
              </a>
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
    </header>
  )
}
