import { IconMessage } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "./ui/textarea";

const feedbackCategories = [
  "Feature Request",
  "New Platform Request",
  "Formatting Issue",
  "Bug Report",
  "General Feedback",
] as const;

export function FeedbackDialog() {
  return (
    <Dialog>
      <form>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger
              render={
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <IconMessage />
                </Button>
              }
            />
          </TooltipTrigger>
          <TooltipContent>
            <span>Share Feedback</span>
          </TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              Help us improve Fix The Text. Share your thoughts, report an
              issue, or suggest new platforms and formatting features.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="feedback-category">Category</FieldLabel>
              <Combobox items={feedbackCategories}>
                <ComboboxInput
                  id="feedback-category"
                  placeholder="Select a category"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No categories found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <Field>
              <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
              <Textarea
                id="textarea-message"
                placeholder="Describe your feedback, suggestion, or issue..."
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
