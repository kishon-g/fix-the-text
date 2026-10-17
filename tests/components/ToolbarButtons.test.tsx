import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  BoldButton,
  BulletListButton,
  ClearAllButton,
  ClearFormattingButton,
  CodeButton,
  EmojiButton,
  ItalicButton,
  NumberedListButton,
  QuoteButton,
  StrikethroughButton,
} from "@/components/toolbar";
import {
  ToolbarContext,
  type ToolbarContextType,
} from "@/context/ToolbarContext";

function renderWithToolbar(
  ui: React.ReactNode,
  overrides: Partial<ToolbarContextType> = {},
) {
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
    insertEmoji: vi.fn(),
    ...overrides,
  };

  return {
    ...render(
      <ToolbarContext.Provider value={defaultToolbar}>
        {ui}
      </ToolbarContext.Provider>,
    ),
    toolbar: defaultToolbar,
  };
}

describe("Toolbar Buttons", () => {
  it("BoldButton calls formatBold on click and shows active styling", async () => {
    const user = userEvent.setup();
    const formatBold = vi.fn();
    const { unmount } = renderWithToolbar(<BoldButton />, {
      isBold: false,
      formatBold,
    });

    const button = screen.getByLabelText(/Bold/i);
    expect(button).not.toHaveClass("bg-accent");
    await user.click(button);
    expect(formatBold).toHaveBeenCalled();

    unmount();
    renderWithToolbar(<BoldButton />, { isBold: true });
    const activeButton = screen.getByLabelText(/Bold/i);
    expect(activeButton).toHaveClass("bg-accent");
  });

  it("ItalicButton calls formatItalic on click", async () => {
    const user = userEvent.setup();
    const formatItalic = vi.fn();
    renderWithToolbar(<ItalicButton />, { formatItalic });

    await user.click(screen.getByLabelText(/Italic/i));
    expect(formatItalic).toHaveBeenCalled();
  });

  it("StrikethroughButton calls formatStrikethrough on click", async () => {
    const user = userEvent.setup();
    const formatStrikethrough = vi.fn();
    renderWithToolbar(<StrikethroughButton />, { formatStrikethrough });

    await user.click(screen.getByLabelText(/Strikethrough/i));
    expect(formatStrikethrough).toHaveBeenCalled();
  });

  it("CodeButton calls formatCode on click", async () => {
    const user = userEvent.setup();
    const formatCode = vi.fn();
    renderWithToolbar(<CodeButton />, { formatCode });

    await user.click(screen.getByLabelText(/Monospace/i));
    expect(formatCode).toHaveBeenCalled();
  });

  it("BulletListButton calls toggleBulletList on click", async () => {
    const user = userEvent.setup();
    const toggleBulletList = vi.fn();
    renderWithToolbar(<BulletListButton />, { toggleBulletList });

    await user.click(screen.getByLabelText(/Bullet List/i));
    expect(toggleBulletList).toHaveBeenCalled();
  });

  it("NumberedListButton calls toggleNumberedList on click", async () => {
    const user = userEvent.setup();
    const toggleNumberedList = vi.fn();
    renderWithToolbar(<NumberedListButton />, { toggleNumberedList });

    await user.click(screen.getByLabelText(/Numbered List/i));
    expect(toggleNumberedList).toHaveBeenCalled();
  });

  it("QuoteButton calls toggleQuote on click", async () => {
    const user = userEvent.setup();
    const toggleQuote = vi.fn();
    renderWithToolbar(<QuoteButton />, { toggleQuote });

    await user.click(screen.getByLabelText(/Quote/i));
    expect(toggleQuote).toHaveBeenCalled();
  });

  it("EmojiButton renders and opens emoji picker popover on click", async () => {
    const user = userEvent.setup();
    renderWithToolbar(<EmojiButton />);

    const button = screen.getByLabelText(/Emoji/i);
    expect(button).toBeInTheDocument();
    await user.click(button);

    expect(
      await screen.findByPlaceholderText(/Search emoji.../i),
    ).toBeInTheDocument();
  });

  it("ClearFormattingButton calls clearFormatting on click", async () => {
    const user = userEvent.setup();
    const clearFormatting = vi.fn();
    renderWithToolbar(<ClearFormattingButton />, { clearFormatting });

    await user.click(screen.getByLabelText(/Clear Formatting/i));
    expect(clearFormatting).toHaveBeenCalled();
  });

  it("ClearAllButton calls clearAll on click", async () => {
    const user = userEvent.setup();
    const clearAll = vi.fn();
    renderWithToolbar(<ClearAllButton />, { clearAll });

    await user.click(screen.getByLabelText(/Clear text/i));
    expect(clearAll).toHaveBeenCalled();
  });
});
