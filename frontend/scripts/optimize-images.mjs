#!/usr/bin/env node
/**
 * Converts images to web-friendly WebP (max 2000px, quality 82) with
 * lowercase-hyphenated names. Originals are left untouched.
 *
 * Usage: node scripts/optimize-images.mjs <input-file-or-folder> [output-folder]
 * Example: node scripts/optimize-images.mjs ~/Desktop/new-mockups public/Mockups
 */
import { readdir, stat, mkdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const [input, outputDir = "public/Mockups"] = process.argv.slice(2)
if (!input) {
  console.error("Usage: node scripts/optimize-images.mjs <input-file-or-folder> [output-folder]")
  process.exit(1)
}

const IMAGE_EXT = /\.(png|jpe?g|webp|tiff?)$/i
const toSlug = (name) =>
  name
    .replace(/(\.[a-z]+)+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const files = (await stat(input)).isDirectory()
  ? (await readdir(input)).filter((f) => IMAGE_EXT.test(f)).map((f) => path.join(input, f))
  : [input]

await mkdir(outputDir, { recursive: true })

for (const file of files) {
  const out = path.join(outputDir, `${toSlug(path.basename(file))}.webp`)
  const info = await sharp(file)
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out)
  console.log(`${path.basename(file)} -> /${path.relative("public", out)} (${Math.round(info.size / 1024)} KB)`)
}
