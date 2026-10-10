import { describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/feedback/route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("POST /api/feedback", () => {
  it("returns 400 if category is missing or empty", async () => {
    const request = new Request("http://localhost:3000/api/feedback", {
      method: "POST",
      body: JSON.stringify({ category: "", message: "Hello" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Category is required.");
  });

  it("returns 400 if message is missing or empty", async () => {
    const request = new Request("http://localhost:3000/api/feedback", {
      method: "POST",
      body: JSON.stringify({ category: "Bug Report", message: "  " }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Message is required.");
  });

  it("returns 201 and data when insertion succeeds", async () => {
    const mockSelect = vi.fn().mockResolvedValue({
      data: [{ id: 1, category: "Feature Request", message: "Dark mode option" }],
      error: null,
    });
    const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
    const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

    vi.mocked(createClient).mockResolvedValue({
      from: mockFrom,
    } as any);

    const request = new Request("http://localhost:3000/api/feedback", {
      method: "POST",
      body: JSON.stringify({ category: "Feature Request", message: "Dark mode option" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.data).toEqual([
      { id: 1, category: "Feature Request", message: "Dark mode option" },
    ]);
  });

  it("returns 500 when Supabase returns an error", async () => {
    const mockSelect = vi.fn().mockResolvedValue({
      data: null,
      error: { message: "Database connection failed" },
    });
    const mockInsert = vi.fn().mockReturnValue({ select: mockSelect });
    const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

    vi.mocked(createClient).mockResolvedValue({
      from: mockFrom,
    } as any);

    const request = new Request("http://localhost:3000/api/feedback", {
      method: "POST",
      body: JSON.stringify({ category: "Bug", message: "Fix this" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Database connection failed");
  });
});
