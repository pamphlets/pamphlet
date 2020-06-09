import { selectParentNode } from 'prosemirror-commands'
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'

export function markupSelection (state, dispatch) {
  if (selectParentNode(state)) return false
  if (dispatch) {
    var plain = getSelection().toString()
    var node = defaultMarkdownParser.parse(plain)
    dispatch(state.tr.replaceSelectionWith(node))
  }
  return true
}

export function turndownSelection (state, dispatch) {
  if (selectParentNode(state)) return false
  if (dispatch) {
    var slice = state.selection.content()
    var markdown = defaultMarkdownSerializer.serialize(slice.content)
    var node = schema.text(markdown)
    dispatch(state.tr.replaceSelectionWith(node))
  }
  return true
}
