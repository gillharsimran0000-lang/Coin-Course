// Data  -  Review submission and retrieval

import { supabase } from "./supabase"

export type Review = {
  id: string
  name: string
  rating: number
  body: string
  created_at: string
}

export async function getReviews(): Promise<Review[]> {
  const { data } = await supabase
    .from("reviews")
    .select("id, name, rating, body, created_at")
    .gte("rating", 4)
    .order("created_at", { ascending: false })
    .limit(9)
  return data ?? []
}

export async function submitReview(
  name: string,
  rating: number,
  body: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("reviews")
    .insert({ name, rating, body })
  return { error: error?.message ?? null }
}
