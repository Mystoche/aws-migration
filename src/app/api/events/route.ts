import { NextRequest } from "next/server";
import { eventsRepository } from "@/lib/repository";
import { apiHandler, parseFilters } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filters = parseFilters(searchParams);
  return apiHandler(() => eventsRepository.list(filters));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return apiHandler(() => eventsRepository.create(body));
}
