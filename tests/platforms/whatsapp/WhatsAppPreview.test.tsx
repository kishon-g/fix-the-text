import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WhatsAppPreview } from "@/components/platforms/whatsapp/WhatsAppPreview";

describe("WhatsAppPreview", () => {
  it("renders empty state when text is empty", () => {
    render(<WhatsAppPreview text="" />);
    expect(screen.getByText("No content to preview")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Start typing in the editor to see your live WhatsApp formatted/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders empty state when text is only whitespace", () => {
    render(<WhatsAppPreview text={"   \n  "} />);
    expect(screen.getByText("No content to preview")).toBeInTheDocument();
  });

  it("renders formatted message when text is provided", () => {
    render(<WhatsAppPreview text="*Hello* world" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  it("displays custom timeString when provided", () => {
    render(<WhatsAppPreview text="Meeting at 5" timeString="10:45 AM" />);
    expect(screen.getByText("10:45 AM")).toBeInTheDocument();
  });

  it("displays fallback formatted time when timeString is not provided", () => {
    const { container } = render(<WhatsAppPreview text="Hello test" />);
    const timeSpan = container.querySelector(".font-mono span");
    expect(timeSpan).not.toBeNull();
    expect(timeSpan?.textContent).toBeTruthy();
  });

  it("renders the chat bubble container with WhatsApp style classes", () => {
    const { container } = render(<WhatsAppPreview text="Styling test" />);
    const bubble = container.querySelector(".rounded-2xl");
    expect(bubble).not.toBeNull();
    expect(bubble?.className).toContain("bg-[#e7fce3]");
  });
});
