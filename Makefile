.PHONY: all deploy

all: public/ckeditor.js

deploy: all
	surge ./public pamphlets-editor.surge.sh

public/ckeditor.js: src/ckeditor.js
	node_modules/.bin/webpack --mode production
