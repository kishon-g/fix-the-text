import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FeedbackDialog } from "@/components/FeedbackDialog";

// Mock the server action
vi.mock("@/app/actions/feedback", () => ({
  submitFeedback: vi.fn(),
}));

describe("FeedbackDialog Component", () => {
  it("renders the feedback trigger button", () => {
    render(<FeedbackDialog />);
    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
  });

  it("opens the dialog modal when the trigger button is clicked", async () => {
    const user = userEvent.setup();
    render(<FeedbackDialog />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    expect(screen.getByText("Share Your Feedback")).toBeInTheDocument();
    expect(
      screen.getByText(/Help us improve Fix The Text/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Describe your feedback/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Submit Feedback" }),
    ).toBeInTheDocument();
  });

  it("allows entering a feedback message", async () => {
    const user = userEvent.setup();
    render(<FeedbackDialog />);

    await user.click(screen.getByRole("button"));

    const textarea = screen.getByPlaceholderText(/Describe your feedback/i);
    await user.type(textarea, "This is great feedback");

    expect(textarea).toHaveValue("This is great feedback");
  });
});
