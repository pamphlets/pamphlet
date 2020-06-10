import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { baseKeymap } from 'prosemirror-commands'
import { buildInputRules, buildKeymap } from 'prosemirror-example-setup'
import { buildMarkdownRules } from './rules'
import { dropCursor } from 'prosemirror-dropcursor'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { markupSelection, turndownSelection } from './commands'
import { schema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'

export default class Pamphlet {
  constructor (container, content = '') {
    this.container = container
    this.state = this.createState(content)
    this.view = this.createView()
  }


  createState (content) {
    return EditorState.create({
      schema,
      doc: this.parse(content),
      plugins: [
        buildInputRules(schema),
        buildMarkdownRules(),
        history(),
        keymap(buildKeymap(schema)),
        keymap({ 'Alt-h': markupSelection, 'Alt-m': turndownSelection }),
        keymap(baseKeymap),
        dropCursor()
      ]
    })
  }

  createView () {
    return new EditorView(this.container, { state: this.state })
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
    this.view.destroy()

    this.state = this.createState(content)
    this.view = this.createView()
  }
}
