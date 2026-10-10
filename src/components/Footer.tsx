import { FeedbackDialog } from "./FeedbackDialog";

export function Footer() {
  return (
    <footer className="flex items-center justify-between w-full border-t border-border/60 bg-background/80 backdrop-blur-md shrink-0">
      <p className="text-xs text-zinc-500">
        Made for messages that deserve more than a tiny text box
      </p>

      {/* <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="ghost" className="cursor-pointer">
            <IconMessage />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Feedback</span>
        </TooltipContent>
      </Tooltip> */}
      <FeedbackDialog />
    </footer>
  );
}
