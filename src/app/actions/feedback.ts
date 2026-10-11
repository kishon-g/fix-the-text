"use server";

import { createClient } from "@/lib/supabase/server";

export type FeedbackState = {
  success?: boolean;
  error?: string;
};

export async function submitFeedback(
  _prevState: FeedbackState | null,
  formData: FormData,
): Promise<FeedbackState> {
  const category = formData.get("category")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!category) {
    return { success: false, error: "Please select a category." };
  }

  if (!message) {
    return { success: false, error: "Please enter your feedback message." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("feedback").insert([
      {
        category,
        message,
      },
    ]);

    if (error) {
      console.error("Supabase error submitting feedback:", error);
      return {
        success: false,
        error: error.message || "Failed to submit feedback to database.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error submitting feedback:", err);
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "An unexpected error occurred.",
    };
  }
}
