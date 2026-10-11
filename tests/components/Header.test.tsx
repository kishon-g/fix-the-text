import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Header } from "@/components/Header";

describe("Header Component", () => {
  it("renders the branding title and subtitle", () => {
    render(<Header />);
    expect(screen.getByText("Fix The")).toBeInTheDocument();
    expect(screen.getByText(/Text/i)).toBeInTheDocument();
  });

  it("renders the platform selector", () => {
    render(<Header platform="whatsapp" />);
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
  });

  it("handles GitHub button click with REPOSITORY_URL env var", async () => {
    const originalEnv = process.env.REPOSITORY_URL;
    process.env.REPOSITORY_URL = "https://github.com/example/fix-the-text";

    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();

    render(<Header />);
    const buttons = screen.getAllByRole("button");
    // Find GitHub button
    const githubButton = buttons.find(
      (btn) => btn.querySelector("svg") !== null,
    );
    if (githubButton) {
      await user.click(githubButton);
      expect(openSpy).toHaveBeenCalledWith(
        "https://github.com/example/fix-the-text",
        "_blank",
        "noopener,noreferrer",
      );
    }

    openSpy.mockRestore();
    process.env.REPOSITORY_URL = originalEnv;
  });
});
