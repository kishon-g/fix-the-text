import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, message } = body;

    if (!category || typeof category !== "string" || !category.trim()) {
      return NextResponse.json(
        { error: "Category is required." },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          category: category.trim(),
          message: message.trim(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase REST insert error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to insert feedback." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error in /api/feedback:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Internal server error.",
      },
      { status: 500 },
    );
  }
}
