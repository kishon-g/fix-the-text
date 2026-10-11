import { describe, expect, it } from "vitest";
import {
  getPlatformDefinition,
  PLATFORM_REGISTRY,
} from "@/components/platforms/registry";

describe("Platform Registry", () => {
  it("contains WhatsApp as a registered platform", () => {
    expect(PLATFORM_REGISTRY.whatsapp).toBeDefined();
    expect(PLATFORM_REGISTRY.whatsapp.id).toBe("whatsapp");
    expect(PLATFORM_REGISTRY.whatsapp.name).toBe("WhatsApp");
    expect(PLATFORM_REGISTRY.whatsapp.badgeLabel).toBe("WhatsApp View");
    expect(PLATFORM_REGISTRY.whatsapp.colorClassName).toContain(
      "text-emerald-500",
    );
    expect(PLATFORM_REGISTRY.whatsapp.Component).toBeDefined();
    expect(PLATFORM_REGISTRY.whatsapp.icon).toBeDefined();
  });

  it("returns WhatsApp definition when requested by id", () => {
    const definition = getPlatformDefinition("whatsapp");
    expect(definition).toBe(PLATFORM_REGISTRY.whatsapp);
    expect(definition.id).toBe("whatsapp");
  });

  it("defaults to WhatsApp when called without arguments", () => {
    const definition = getPlatformDefinition();
    expect(definition).toBe(PLATFORM_REGISTRY.whatsapp);
  });

  it("falls back to WhatsApp when an unknown platform is requested", () => {
    const definition = getPlatformDefinition("nonexistent_platform");
    expect(definition).toBe(PLATFORM_REGISTRY.whatsapp);
  });
});
