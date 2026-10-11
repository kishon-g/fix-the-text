import { describe, expect, it, vi } from "vitest";
import { submitFeedback } from "@/app/actions/feedback";
import { createClient } from "@/lib/supabase/client";

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(),
}));

describe("submitFeedback Server Action", () => {
  it("returns error if category is missing or empty", async () => {
    const formData = new FormData();
    formData.append("category", "");
    formData.append("message", "Test message");

    const result = await submitFeedback(null, formData);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Please select a category.");
  });

  it("returns error if message is missing or empty", async () => {
    const formData = new FormData();
    formData.append("category", "General Feedback");
    formData.append("message", "   ");

    const result = await submitFeedback(null, formData);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Please enter your feedback message.");
  });

  it("returns success when feedback is stored in Supabase", async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

    vi.mocked(createClient).mockResolvedValue({
      from: mockFrom,
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const formData = new FormData();
    formData.append("category", "Feature Request");
    formData.append("message", "Add Telegram support");

    const result = await submitFeedback(null, formData);
    expect(result.success).toBe(true);
    expect(mockFrom).toHaveBeenCalledWith("feedback");
    expect(mockInsert).toHaveBeenCalledWith([
      { category: "Feature Request", message: "Add Telegram support" },
    ]);
  });

  it("returns error when Supabase fails", async () => {
    const mockInsert = vi.fn().mockResolvedValue({
      error: { message: "Permission denied on feedback table" },
    });
    const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

    vi.mocked(createClient).mockResolvedValue({
      from: mockFrom,
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const formData = new FormData();
    formData.append("category", "Bug Report");
    formData.append("message", "Crash on click");

    const result = await submitFeedback(null, formData);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Permission denied on feedback table");
  });

  it("handles unexpected errors gracefully", async () => {
    vi.mocked(createClient).mockRejectedValue(new Error("Network timeout"));

    const formData = new FormData();
    formData.append("category", "Bug Report");
    formData.append("message", "Some feedback");

    const result = await submitFeedback(null, formData);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Network timeout");
  });
});
