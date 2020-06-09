import { InputRule, inputRules } from 'prosemirror-inputrules'
import { schema } from 'prosemirror-markdown'

export function buildMarkdownRules () {
  var rules = []
  rules.push(markInputRule(/(?:\*\*|__)([^\*_]+)(?:\*\*|__)$/, schema.marks.strong)) // eslint-disable-line
  rules.push(markInputRule(/(?:^|[^\*_])(?:\*|_)([^\*_]+)(?:\*|_)$/, schema.marks.em)) // eslint-disable-line
  rules.push(markInputRule(/(?:`)([^`]+)(?:`)$/, schema.marks.code)) // eslint-disable-line
  rules.push(markInputRule(/\[([^\]]+)\]\(([^\)]+)\)$/, schema.marks.link, match => ({ href: match[2] }))) // eslint-disable-line
  return inputRules({ rules })
}

function markInputRule (regexp, markType, getAttrs) {
  const newRegexp = new RegExp(regexp.source.replace(/\$$/, '') + '(.)' + '$')

  return new InputRule(newRegexp, (state, match, start, end) => {
    const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs
    const textStart = start + match[0].indexOf(match[1])
    const textEnd = textStart + match[1].length
    const tr = state.tr

    start = (match[0].match(/^\s/)) ? start + 1 : start

    if (textEnd < end) tr.delete(textEnd, end)
    if (textStart > start) tr.delete(start, textStart)

    end = start + match[1].length

    return tr
      .addMark(start, end, markType.create(attrs))
      .insert(end, schema.text(match[match.length - 1]))
  })
}
