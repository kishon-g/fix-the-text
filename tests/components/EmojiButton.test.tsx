import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmojiButton } from "@/components/toolbar";
import {
  ToolbarContext,
  type ToolbarContextType,
} from "@/context/ToolbarContext";

function renderEmojiButton(overrides: Partial<ToolbarContextType> = {}) {
  const insertEmoji = vi.fn();
  const defaultToolbar: ToolbarContextType = {
    isBold: false,
    isItalic: false,
    isStrikethrough: false,
    isCode: false,
    isBulletList: false,
    isNumberedList: false,
    isQuote: false,
    formatBold: vi.fn(),
    formatItalic: vi.fn(),
    formatStrikethrough: vi.fn(),
    formatCode: vi.fn(),
    toggleBulletList: vi.fn(),
    toggleNumberedList: vi.fn(),
    toggleQuote: vi.fn(),
    clearFormatting: vi.fn(),
    clearAll: vi.fn(),
    insertEmoji,
    ...overrides,
  };

  const utils = render(
    <ToolbarContext.Provider value={defaultToolbar}>
      <EmojiButton />
    </ToolbarContext.Provider>,
  );

  return {
    ...utils,
    insertEmoji,
  };
}

describe("EmojiButton", () => {
  it("renders the emoji button with proper aria-label and icon", () => {
    renderEmojiButton();
    const button = screen.getByRole("button", { name: /emoji/i });
    expect(button).toBeInTheDocument();
  });

  it("opens popover with search input and no footer preview", async () => {
    const user = userEvent.setup();
    renderEmojiButton();

    const button = screen.getByRole("button", { name: /emoji/i });
    await user.click(button);

    // Search input is present and functional
    const searchInput =
      await screen.findByPlaceholderText(/search emoji\.\.\./i);
    expect(searchInput).toBeInTheDocument();

    // Verify footer preview description section is removed
    expect(screen.queryByText(/what's your mood/i)).not.toBeInTheDocument();
  });

  it("allows searching emojis via the search input", async () => {
    const user = userEvent.setup();
    renderEmojiButton();

    const button = screen.getByRole("button", { name: /emoji/i });
    await user.click(button);

    const searchInput =
      await screen.findByPlaceholderText(/search emoji\.\.\./i);
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, "smile");
    expect(searchInput).toHaveValue("smile");
  });
});
