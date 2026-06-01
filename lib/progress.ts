// Backend — Lesson progress and quiz score database functions

import { supabase } from "./supabase"
import { modules } from "./modules"

export interface LessonProgress {
  lesson_id: number
  watch_progress: number
  completed: boolean
}

export async function loadModuleProgress(userId: string, moduleId: number): Promise<LessonProgress[]> {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id, watch_progress, completed")
    .eq("user_id", userId)
    .eq("module_id", moduleId)
  if (error) {
    console.error("[progress] loadModuleProgress failed:", error.message)
    return []
  }
  return (data as LessonProgress[]) ?? []
}

export async function upsertLessonProgress(
  userId: string,
  moduleId: number,
  lessonId: number,
  watchProgress: number,
): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: userId,
        module_id: moduleId,
        lesson_id: lessonId,
        watch_progress: Math.min(100, Math.max(0, watchProgress)),
        completed: watchProgress >= 90,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_id,lesson_id" }
    )
  if (error) {
    console.error("[progress] upsertLessonProgress failed:", error.message)
    return { ok: false }
  }
  return { ok: true }
}

export async function isModuleUnlocked(userId: string, moduleId: number): Promise<boolean> {
  if (moduleId <= 1) return true
  const prevModule = modules.find(m => m.id === moduleId - 1)
  const prevLessonCount = prevModule?.lessons.length ?? 5
  const [{ data: quiz }, { count }] = await Promise.all([
    supabase
      .from("quiz_scores")
      .select("score, total")
      .eq("user_id", userId)
      .eq("module_id", moduleId - 1)
      .maybeSingle(),
    supabase
      .from("lesson_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("module_id", moduleId - 1)
      .eq("completed", true),
  ])
  if (quiz && quiz.total > 0 && quiz.score / quiz.total >= 0.6) return true
  return (count ?? 0) >= prevLessonCount
}

export async function upsertQuizScore(
  userId: string,
  moduleId: number,
  score: number,
  total: number,
): Promise<{ ok: boolean }> {
  const { error } = await supabase
    .from("quiz_scores")
    .upsert(
      {
        user_id: userId,
        module_id: moduleId,
        score,
        total,
        pct: Math.round((score / total) * 100),
        taken_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_id" }
    )
  if (error) {
    console.error("[progress] upsertQuizScore failed:", error.message)
    return { ok: false }
  }
  return { ok: true }
}
