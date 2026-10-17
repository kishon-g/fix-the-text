import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Automatically cleanup DOM after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  private cb: IntersectionObserverCallback;

  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }

  observe(target: Element) {
    setTimeout(() => {
      this.cb(
        [
          {
            isIntersecting: true,
            target,
            intersectionRatio: 1,
            time: Date.now(),
            boundingClientRect: target.getBoundingClientRect(),
            intersectionRect: target.getBoundingClientRect(),
            rootBounds: null,
          } as IntersectionObserverEntry,
        ],
        this as unknown as IntersectionObserver,
      );
    }, 0);
  }

  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// Polyfill requestAnimationFrame / cancelAnimationFrame for jsdom
if (typeof window.requestAnimationFrame === "undefined") {
  window.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(
      cb,
      0,
    ) as unknown as number) as typeof window.requestAnimationFrame;
}
if (typeof window.cancelAnimationFrame === "undefined") {
  window.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as typeof window.cancelAnimationFrame;
}
globalThis.requestAnimationFrame = window.requestAnimationFrame;
globalThis.cancelAnimationFrame = window.cancelAnimationFrame;

// Mock navigator.clipboard
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(""),
  },
  writable: true,
  configurable: true,
});
