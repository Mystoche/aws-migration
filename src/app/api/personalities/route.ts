import { NextRequest } from "next/server";
import { personalitiesRepository } from "@/lib/repository";
import { apiHandler } from "@/lib/api-utils";

export async function GET() {
  return apiHandler(() => personalitiesRepository.list());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // In local mode, creation is handled by the Zustand admin store.
  return apiHandler(async () => ({ ...body, id: `p-${Date.now().toString(36)}` }));
}
