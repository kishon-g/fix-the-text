import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolbarProvider, useToolbar } from "@/context/ToolbarContext";

function TestConsumer() {
  const toolbar = useToolbar();
  return <div>Bold state: {toolbar.isBold ? "yes" : "no"}</div>;
}

describe("ToolbarContext", () => {
  it("throws an error when useToolbar is used outside ToolbarProvider", () => {
    // Suppress console.error in React during error boundary test
    const consoleError = console.error;
    console.error = () => {};

    expect(() => render(<TestConsumer />)).toThrow(
      "useToolbar must be used within a ToolbarProvider",
    );

    console.error = consoleError;
  });

  it("provides toolbar state when wrapped in ToolbarProvider and LexicalComposer", () => {
    const initialConfig = {
      namespace: "TestComposer",
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarProvider>
          <TestConsumer />
        </ToolbarProvider>
      </LexicalComposer>,
    );

    expect(screen.getByText("Bold state: no")).toBeInTheDocument();
  });
});
