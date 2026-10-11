import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Preview } from "@/components/Preview";

describe("Preview Component", () => {
  it("renders tabs and WhatsApp chat preview by default", () => {
    render(<Preview text="Hello test" platform="whatsapp" />);

    expect(screen.getByText("Chat View")).toBeInTheDocument();
    expect(screen.getByText("Raw Syntax")).toBeInTheDocument();
    expect(screen.getByText("Hello test")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Copy\s*WhatsApp/i }),
    ).toBeInTheDocument();
  });

  it("disables copy button when text is empty", () => {
    render(<Preview text="" platform="whatsapp" />);
    const copyButton = screen.getByRole("button", { name: /Copy\s*WhatsApp/i });
    expect(copyButton).toBeDisabled();
  });

  it("switches to raw syntax view when clicking Raw Syntax tab", async () => {
    const user = userEvent.setup();
    render(<Preview text="*Raw Bold Message*" platform="whatsapp" />);

    const rawTab = screen.getByText("Raw Syntax");
    await user.click(rawTab);

    // In raw view, the raw markdown should be displayed
    expect(screen.getByText("*Raw Bold Message*")).toBeInTheDocument();
  });

  it("shows placeholder in raw syntax view when text is empty", async () => {
    const user = userEvent.setup();
    render(<Preview text="" platform="whatsapp" />);

    const rawTab = screen.getByText("Raw Syntax");
    await user.click(rawTab);

    expect(screen.getByText("No raw syntax generated")).toBeInTheDocument();
  });

  it("copies content to clipboard and shows copied state", async () => {
    const user = userEvent.setup();
    const writeTextSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);

    render(<Preview text="Text to copy" platform="whatsapp" />);

    const copyButton = screen.getByRole("button", { name: /Copy\s*WhatsApp/i });
    expect(copyButton).not.toBeDisabled();

    await user.click(copyButton);

    expect(writeTextSpy).toHaveBeenCalledWith("Text to copy");
    expect(screen.getByText("Copied!")).toBeInTheDocument();
    writeTextSpy.mockRestore();
  });

  it("supports backwards-compatible whatsappText prop", () => {
    render(<Preview whatsappText="From whatsappText prop" />);
    expect(screen.getByText("From whatsappText prop")).toBeInTheDocument();
  });
});
