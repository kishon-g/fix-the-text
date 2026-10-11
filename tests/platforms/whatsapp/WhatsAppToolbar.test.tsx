import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WhatsAppToolbar } from "@/components/application/WhatsAppToolbar";

describe("WhatsAppToolbar", () => {
  const initialConfig = {
    namespace: "TestComposer",
    onError: () => {},
  };

  it("renders all toolbar buttons inside LexicalComposer", () => {
    render(
      <LexicalComposer initialConfig={initialConfig}>
        <WhatsAppToolbar />
      </LexicalComposer>,
    );

    expect(screen.getByLabelText(/Bold/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Italic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Strikethrough/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monospace/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bullet List/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numbered List/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quote/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Clear Formatting/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Clear text/i)).toBeInTheDocument();
  });
});
