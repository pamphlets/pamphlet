# Pamphlet

Write faster without distractions

## Install

From NPM:

```
$ npm install pamphlet
```

You can also use a good old script tag:

```html
<script src="https://unpkg.com/pamphlet@3.x/dist/umd/pamphlet.js"></script>
```

Or a fancy new module import:

```js
import Pamphlet from 'https://unpkg.com/pamphlet@3.x/dist/esm/pamphlet.js'
```

## Use

This example sets up a Pamphlet editor with some prefilled content.

```
var content = '# Some Markdown'
var editor = new Pamphlet(document.body, content)

// Crude autosave, please don't use this in production :)
setInterval(() => {
  localStorage.setItem('pamphlet-content', editor.content)
}, 7000)
```

Pamphlet aims to provide a fast and focused writing experience. To achieve this the UI is kept absolutely minimal. In fact, there is no UI at all. Formatting can be applied in two ways. You can either type Markdown syntax and get it rendered instantly. Or you can use keyboard shortcuts. Adding images is possible using drag-and-drop.

Because Pamphlet ships without its own UI, it will also fit right into any existing design. No fiddling with custom CSS, no compatibility issues. Do give it a try!

### Keymap

TODO: list keyboard shortcuts

## Acknowledgements

Pamphlet is built using [ProseMirror](https://prosemirror.net), an amazing text editing toolset that does all the heavy lifting under the hood!

## License

Apache-2.0
