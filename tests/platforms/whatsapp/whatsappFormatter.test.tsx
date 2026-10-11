import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  parseWhatsAppInline,
  renderWhatsAppMessage,
} from "@/components/platforms/whatsapp/whatsappFormatter";

describe("whatsappFormatter", () => {
  describe("parseWhatsAppInline", () => {
    it("renders unformatted plain text correctly", () => {
      const { container } = render(
        <div>{parseWhatsAppInline("Hello world")}</div>,
      );
      expect(container.textContent).toBe("Hello world");
    });

    it("formats *bold* text with strong tags", () => {
      const { container } = render(
        <div>{parseWhatsAppInline("*bold message*")}</div>,
      );
      const strong = container.querySelector("strong");
      expect(strong).not.toBeNull();
      expect(strong?.textContent).toBe("bold message");
      expect(strong?.className).toContain("font-semibold");
    });

    it("formats _italic_ text with em tags", () => {
      const { container } = render(
        <div>{parseWhatsAppInline("_italic message_")}</div>,
      );
      const em = container.querySelector("em");
      expect(em).not.toBeNull();
      expect(em?.textContent).toBe("italic message");
      expect(em?.className).toContain("italic");
    });

    it("formats ~strikethrough~ text with del tags", () => {
      const { container } = render(
        <div>{parseWhatsAppInline("~strikethrough message~")}</div>,
      );
      const del = container.querySelector("del");
      expect(del).not.toBeNull();
      expect(del?.textContent).toBe("strikethrough message");
      expect(del?.className).toContain("line-through");
    });

    it("formats `code` text with code tags", () => {
      const { container } = render(
        <div>{parseWhatsAppInline("`console.log()`")}</div>,
      );
      const code = container.querySelector("code");
      expect(code).not.toBeNull();
      expect(code?.textContent).toBe("console.log()");
      expect(code?.className).toContain("font-mono");
    });

    it("parses multiple formats in a single sentence", () => {
      const { container } = render(
        <div>
          {parseWhatsAppInline(
            "Hello *bold* and _italic_ and ~strike~ with `code`",
          )}
        </div>,
      );
      expect(container.querySelector("strong")?.textContent).toBe("bold");
      expect(container.querySelector("em")?.textContent).toBe("italic");
      expect(container.querySelector("del")?.textContent).toBe("strike");
      expect(container.querySelector("code")?.textContent).toBe("code");
    });

    it("handles nested bold and italic tags", () => {
      const { container } = render(
        <div>{parseWhatsAppInline("*_nested bold and italic_*")}</div>,
      );
      const strong = container.querySelector("strong");
      expect(strong).not.toBeNull();
      const em = strong?.querySelector("em");
      expect(em).not.toBeNull();
      expect(em?.textContent).toBe("nested bold and italic");
    });

    it("handles empty string gracefully", () => {
      const { container } = render(<div>{parseWhatsAppInline("")}</div>);
      expect(container.textContent).toBe("");
    });
  });

  describe("renderWhatsAppMessage", () => {
    it("renders single-line message", () => {
      render(renderWhatsAppMessage("Hello there!"));
      expect(screen.getByText("Hello there!")).toBeInTheDocument();
    });

    it("renders empty lines with break tags", () => {
      const { container } = render(renderWhatsAppMessage("Line 1\n\nLine 2"));
      const br = container.querySelector("br");
      expect(br).not.toBeNull();
    });

    it("renders quote lines starting with '> '", () => {
      const { container } = render(renderWhatsAppMessage("> Quoted line text"));
      const quoteDiv = container.querySelector(".border-l-\\[3px\\]");
      expect(quoteDiv).not.toBeNull();
      expect(quoteDiv?.textContent).toContain("Quoted line text");
    });

    it("renders empty quote line with <br />", () => {
      const { container } = render(renderWhatsAppMessage("> "));
      const quoteDiv = container.querySelector(".border-l-\\[3px\\]");
      expect(quoteDiv).not.toBeNull();
      expect(quoteDiv?.querySelector("br")).not.toBeNull();
    });

    it("renders multi-line messages with mixed formatting and quotes", () => {
      const message =
        "Title: *Announcement*\n> Note: _important_\nNormal text with `code`";
      const { container } = render(renderWhatsAppMessage(message));
      expect(container.querySelector("strong")?.textContent).toBe(
        "Announcement",
      );
      expect(container.querySelector(".border-l-\\[3px\\]")).not.toBeNull();
      expect(container.querySelector("code")?.textContent).toBe("code");
    });
  });
});
