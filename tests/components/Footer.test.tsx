import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/Footer";

describe("Footer Component", () => {
  it("renders the footer tagline", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "Made for messages that deserve more than a tiny text box",
      ),
    ).toBeInTheDocument();
  });

  it("contains the feedback dialog button trigger", () => {
    render(<Footer />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
