import { NextRequest, NextResponse } from "next/server";
import { eventsRepository } from "@/lib/repository";
import { apiHandler } from "@/lib/api-utils";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return apiHandler(async () => {
    const event = await eventsRepository.getBySlug(id) ?? await eventsRepository.getById(id);
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return event;
  });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return apiHandler(() => eventsRepository.update(id, body));
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return apiHandler(() => eventsRepository.delete(id));
}
