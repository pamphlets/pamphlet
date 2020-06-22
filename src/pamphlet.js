import { EditorState, AllSelection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { baseKeymap } from 'prosemirror-commands'
import { buildInputRules, buildKeymap } from 'prosemirror-example-setup'
import { buildMarkdownRules } from './rules'
import { dropCursor } from 'prosemirror-dropcursor'
import { formatCurrentNode, removeNodeFormatting } from './commands'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'
import wordcount from 'wordcount'

var corePlugins = [
  buildInputRules(schema),
  buildMarkdownRules(),
  history(),
  keymap(buildKeymap(schema)),
  keymap({ 'Alt-f': formatCurrentNode, 'Alt-r': removeNodeFormatting }),
  keymap(baseKeymap),
  dropCursor()
]

export default class Pamphlet {
  constructor (container, content = '', opts = {}) {
    if (typeof content === 'object') {
      opts = content
      content = ''
    }

    opts.plugins = opts.plugins || []

    this.container = container
    this.plugins = opts.plugins.concat(corePlugins)
    this.state = this.createState(content)
    this.view = this.createView()
    this.toggleEmpty()
  }

  createState (content) {
    return EditorState.create({
      schema,
      doc: this.parse(content),
      plugins: this.plugins
    })
  }

  createView () {
    return new EditorView(this.container, {
      state: this.state,
      dispatchTransaction: tr => {
        this.state = this.state.apply(tr)
        this.view.updateState(this.state)
        this.toggleEmpty()
      }
    })
  }

  toggleEmpty () {
    if (this.empty) {
      this.view.dom.classList.add('ProseMirror-empty')
    } else {
      this.view.dom.classList.remove('ProseMirror-empty')
    }
  }

  count () {
    var txt = this.selection.anchor === this.selection.head
      ? this.view.dom.innerText
      : window.getSelection().toString()

    var words = wordcount(txt)
    var chars = words !== 0 ? txt.length : 0
    return { chars, words }
  }

  parse (content) {
    return defaultMarkdownParser.parse(content)
  }

  serialize (slice) {
    return defaultMarkdownSerializer.serialize(slice)
  }

  get content () {
    return this.serialize(this.view.state.doc)
  }

  set content (content) {
    var select = new AllSelection(this.state.doc)
    var tr = this.state.tr
    tr = tr.setSelection(select)
    tr = tr.replaceSelectionWith(this.parse(content))
    this.view.dispatch(tr)
  }

  get empty () {
    return this.state.doc.childCount === 1 &&
      this.state.doc.firstChild.isTextblock &&
      this.state.doc.firstChild.content.size === 0
  }

  get selection () {
    return this.state.selection
  }
}
