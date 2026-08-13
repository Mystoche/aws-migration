/**
 * Helper for API route handlers.
 * Wraps the handler in a try/catch that returns a clean JSON error.
 */
import { NextResponse } from "next/server";

export async function apiHandler<T>(
  fn: () => Promise<T>,
): Promise<NextResponse> {
  try {
    const data = await fn();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur interne";
    const status = message.includes("not configured") ? 501 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

/** Parse search params into a typed object. */
export function parseFilters(searchParams: URLSearchParams) {
  return {
    period: searchParams.get("period") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("search") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    yearFrom: searchParams.get("yearFrom") ? Number(searchParams.get("yearFrom")) : undefined,
    yearTo: searchParams.get("yearTo") ? Number(searchParams.get("yearTo")) : undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
  };
}
