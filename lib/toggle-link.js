import { toggleMark } from 'prosemirror-commands'
import { schema } from 'prosemirror-markdown'

export function toggleLink (state, dispatch) {
  var type = schema.marks.link

  if (markActive(state, type)) {
    toggleMark(type)(state, dispatch)
  } else {
    var href = window.prompt('Add a hyperlink:')
    toggleMark(type, { href })(state, dispatch)
  }
  return true
}

function markActive (state, type) {
  var { from, $from, to, empty } = state.selection
  if (empty) return type.isInSet(state.storedMarks || $from.marks())
  else return state.doc.rangeHasMark(from, to, type)
}
