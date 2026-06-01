"use client"

// Data — PDF notes generator

import type { Module } from "./modules"

function clean(text: string): string {
  return text
    .replace(/—/g, ", ")
    .replace(/–/g, "-")
    .replace(/‘|’/g, "'")
    .replace(/“|”/g, '"')
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function addPage(doc: InstanceType<typeof import("jspdf")["default"]>) {
  doc.addPage()
  return 52
}

function checkPage(
  doc: InstanceType<typeof import("jspdf")["default"]>,
  y: number,
  needed: number
): number {
  const pageH = doc.internal.pageSize.getHeight()
  if (y + needed > pageH - 48) {
    return addPage(doc)
  }
  return y
}

export async function generateNotes(mod: Module): Promise<void> {
  const { default: jsPDF } = await import("jspdf")

  const doc = new jsPDF({ unit: "pt", format: "letter" })

  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const ml = 56
  const mr = 56
  const cw = pageW - ml - mr

  // Header band
  doc.setFillColor(26, 22, 14)
  doc.rect(0, 0, pageW, 88, "F")

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(140, 130, 100)
  doc.text(`MODULE ${String(mod.id).padStart(2, "0")} OF 08`, ml, 30)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(24)
  doc.setTextColor(246, 239, 217)
  doc.text(mod.title.toUpperCase(), ml, 60)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(150, 140, 110)
  doc.text(`${mod.duration} min  |  ${mod.lessons.length} lessons  |  ${mod.quizCount} quiz questions`, ml, 78)

  let y = 116

  // Tagline
  doc.setFont("helvetica", "italic")
  doc.setFontSize(12)
  doc.setTextColor(100, 92, 72)
  const tagLines = doc.splitTextToSize(clean(mod.tagline), cw)
  doc.text(tagLines, ml, y)
  y += tagLines.length * 16 + 18

  // Rule
  doc.setDrawColor(200, 192, 168)
  doc.setLineWidth(0.5)
  doc.line(ml, y, pageW - mr, y)
  y += 26

  // Section helper
  function sectionTitle(label: string) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(60, 55, 40)
    doc.text(label.toUpperCase(), ml, y)
    y += 4
    doc.setDrawColor(220, 210, 185)
    doc.line(ml, y, ml + 180, y)
    y += 14
  }

  // Overview
  y = checkPage(doc, y, 80)
  sectionTitle("Overview")
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(55, 50, 38)
  const descLines = doc.splitTextToSize(clean(mod.description), cw)
  descLines.forEach((line: string) => {
    y = checkPage(doc, y, 16)
    doc.text(line, ml, y)
    y += 15
  })
  y += 18

  // Lessons
  y = checkPage(doc, y, 60)
  sectionTitle("Lessons")
  mod.lessons.forEach((lesson, i) => {
    y = checkPage(doc, y, 18)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(55, 50, 38)
    const num = String(i + 1).padStart(2, "0")
    doc.text(`${num}.  ${clean(lesson.title)}`, ml + 6, y)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(140, 130, 100)
    doc.text(`${lesson.duration} min`, pageW - mr - 36, y)
    y += 17
  })
  y += 18

  // Key takeaways
  y = checkPage(doc, y, 60)
  sectionTitle("Key takeaways")
  mod.takeaways.forEach((t) => {
    const lines = doc.splitTextToSize(clean(t), cw - 16)
    y = checkPage(doc, y, lines.length * 15 + 8)
    doc.setFillColor(200, 175, 90)
    doc.circle(ml + 5, y - 4, 2.5, "F")
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(55, 50, 38)
    doc.text(lines, ml + 14, y)
    y += lines.length * 15 + 7
  })
  y += 22

  // Notes lines
  y = checkPage(doc, y, 80)
  sectionTitle("My notes")

  const lineSpacing = 28
  const linesAvailable = Math.floor((pageH - 48 - y) / lineSpacing)
  const linesToDraw = Math.max(linesAvailable, 6)
  let drawn = 0

  while (drawn < linesToDraw) {
    y = checkPage(doc, y, lineSpacing)
    doc.setDrawColor(215, 208, 188)
    doc.setLineWidth(0.4)
    doc.line(ml, y, pageW - mr, y)
    y += lineSpacing
    drawn++
  }

  // Footer on every page
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(170, 160, 135)
    doc.text("Coin Course   |   Free financial literacy for every age   |   cashcourse.org", ml, pageH - 22)
    doc.text(`${p} / ${totalPages}`, pageW - mr - 20, pageH - 22)
  }

  const slug = mod.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  doc.save(`cash-course-module-${String(mod.id).padStart(2, "0")}-${slug}.pdf`)
}