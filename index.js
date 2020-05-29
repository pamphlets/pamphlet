var { EditorState } = require('prosemirror-state')
var { EditorView } = require('prosemirror-view')
var { baseKeymap } = require('prosemirror-commands')
var { buildInputRules, buildKeymap } = require('prosemirror-example-setup')
var { buildMarkdownRules } = require('./lib/markdown-rules')
var { dropCursor } = require('prosemirror-dropcursor')
var { history } = require('prosemirror-history')
var { keymap } = require('prosemirror-keymap')
var { schema, defaultMarkdownParser, defaultMarkdownSerializer } = require('prosemirror-markdown')
var { toggleLink } = require('./lib/toggle-link')

class Pamphlet {
  constructor (container, content = '') {
    this.container = container
    this.view = this.createView(content)
  }

  createState (content) {
    return EditorState.create({
      schema,
      doc: defaultMarkdownParser.parse(content),
      plugins: [
        buildInputRules(schema),
        buildMarkdownRules(schema),
        history(),
        keymap(buildKeymap(schema)),
        keymap({ 'Mod-h': toggleLink, 'Mod-H': toggleLink }),
        keymap(baseKeymap),
        dropCursor()
      ]
    })
  }

  createView (content) {
    var state = this.createState(content)
    var view = new EditorView(this.container, { state })
    view.dom.style.preWrap = 'pre-wrap'
    return view
  }

  get content () {
    return defaultMarkdownSerializer.serialize(this.view.state.doc)
  }

  set content (content) {
    this.view.destroy()
    this.view = this.createView(content)
  }

  get state () {
    return this.view.state
  }
}

module.exports = Pamphlet
