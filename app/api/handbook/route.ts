import { NextResponse } from "next/server";

import {
  getHandbookData,
  addArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/handbook-store";

export async function GET() {
  try {
    const data = await getHandbookData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch handbook articles." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.category) {
      return NextResponse.json(
        { error: "Title and Category are required." },
        { status: 400 },
      );
    }

    const id =
      body.id ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newArticle = {
      ...body,
      id,
      slug: body.slug || id,
      date: body.date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };

    const articles = await addArticle(newArticle);
    return NextResponse.json({ success: true, article: newArticle, articles });
  } catch {
    return NextResponse.json(
      { error: "Failed to create handbook article." },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updatedFields } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required for updating." },
        { status: 400 },
      );
    }

    const updated = await updateArticle(id, updatedFields);

    if (!updated) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, article: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update handbook article." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required for deletion." },
        { status: 400 },
      );
    }

    const deleted = await deleteArticle(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Article not found or could not be deleted." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Article deleted successfully." });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete handbook article." },
      { status: 500 },
    );
  }
}
