import { defaultRules, inlineRegex } from "simple-markdown"
import { getCustomEmojiUrl } from "../helpers/getCustomEmojiUrl"
import { MarkdownRule } from "../types/MarkdownRule"

const CUSTOM_EMOJI_RE = /^<a?:(\w+):(\d+)>/

export const customEmoji: MarkdownRule = {
  ...defaultRules.text,
  match: inlineRegex(CUSTOM_EMOJI_RE),
  parse: capture => {
    const [, name, id] = capture

    return {
      type: "emoji",
      name,
      emoji: name,
      src: getCustomEmojiUrl(id),
    }
  },
}
