import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlatformSelector } from "@/components/platforms/PlatformSelector";

describe("PlatformSelector", () => {
  it("renders trigger with default selected platform", () => {
    render(<PlatformSelector platform="whatsapp" />);
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
  });

  it("applies custom className to combobox trigger", () => {
    const { container } = render(
      <PlatformSelector platform="whatsapp" className="custom-test-class" />,
    );
    const trigger = container.querySelector(".custom-test-class");
    expect(trigger).not.toBeNull();
  });
});
