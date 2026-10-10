"use client";

import { IconMessage } from "@tabler/icons-react";
import { useActionState, useEffect, useState } from "react";
import { type FeedbackState, submitFeedback } from "@/app/actions/feedback";
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
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string | null>(
    feedbackCategories[0],
  );
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (prevState: FeedbackState | null, formData: FormData) => {
      const res = await submitFeedback(prevState, formData);
      return res;
    },
    null,
  );

  useEffect(() => {
    if (state?.success) {
      setSubmitted(true);
      const timer = setTimeout(() => {
        setOpen(false);
        setSubmitted(false);
        setMessage("");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state?.success]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
        {submitted ? (
          <div className="py-6 text-center">
            <h3 className="font-medium text-lg text-foreground">Thank you!</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Your feedback has been submitted successfully.
            </p>
          </div>
        ) : (
          <form action={formAction}>
            <input type="hidden" name="category" value={category ?? ""} />
            <DialogHeader>
              <DialogTitle>Share Your Feedback</DialogTitle>
              <DialogDescription>
                Help us improve Fix The Text. Share your thoughts, report an
                issue, or suggest new platforms and formatting features.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="mt-4">
              <Field>
                <FieldLabel htmlFor="feedback-category">Category</FieldLabel>
                <Combobox
                  items={feedbackCategories}
                  value={category}
                  onValueChange={(val) => setCategory(val)}
                >
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
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your feedback, suggestion, or issue..."
                  required
                />
              </Field>

              {state?.error && (
                <p className="text-destructive text-sm" role="alert">
                  {state.error}
                </p>
              )}
            </FieldGroup>
            <DialogFooter className="mt-6">
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Feedback"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
