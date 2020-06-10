import { NodeSelection, TextSelection } from 'prosemirror-state'
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'

export function formatCurrentNode (state, dispatch) {
  if (!state.selection.empty) return false
  if (dispatch) {
    var pos = getNodeStartPosition(state.selection)
    var tr = selectParentNode(state)
    var markdown = serializeSlice(tr.selection.content())
    var node = defaultMarkdownParser.parse(markdown)

    tr = tr.replaceSelectionWith(node)
    tr = tr.setSelection(TextSelection.create(tr.doc, pos))
    dispatch(tr)
  }
  return true
}

export function removeNodeFormatting (state, dispatch) {
  if (!state.selection.empty) return false
  if (dispatch) {
    var pos = getNodeStartPosition(state.selection)
    var tr = selectParentNode(state)
    var markdown = serializeSlice(tr.selection.content())
    var node = schema.text(markdown)

    tr = tr.replaceSelectionWith(node, false)
    tr = tr.setSelection(TextSelection.create(tr.doc, pos))
    dispatch(tr)
  }
  return true
}

function getNodeStartPosition ({ $anchor }) {
  return $anchor.pos - $anchor.parentOffset
}

function selectParentNode (state) {
  if (!state.selection.empty) return state.tr
  var { $from, to } = state.selection
  var same = $from.sharedDepth(to)

  if (same === 0) return state.tr
  var pos = $from.before(same)
  var select = NodeSelection.create(state.doc, pos)
  return state.tr.setSelection(select)
}

function serializeSlice (slice) {
  return defaultMarkdownSerializer.serialize(slice.content).replace(/\\/g, '')
}
