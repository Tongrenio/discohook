/* eslint-disable import/newline-after-import */

import type { HLJSStatic, IModeBase } from "highlight.js"
import { getLanguageFromAlias } from "./getLanguageFromAlias"
const hljs = require("highlight.js/lib/highlight") as typeof import("highlight.js")

const importRawLanguage = async (name: string) =>
  import(`highlight.js/lib/languages/${name}`).then(
    module => module.default as (hljs?: HLJSStatic) => IModeBase,
  )

export const importLanguage = async (alias: string) => {
  const language = getLanguageFromAlias(alias)
  if (!language) return

  const langPromise = importRawLanguage(language.name)

  if (language.dependencies) {
    await Promise.all(language.dependencies.map(importLanguage))
  }

  hljs.registerLanguage(language.name, await langPromise)
  if (typeof window !== "undefined") {
    console.log("Registered highlight.js language:", language.name)
  }
}
