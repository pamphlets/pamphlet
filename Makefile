.PHONY: all publish

all: dist/pamphlet.debug.js dist/pamphlet.min.js

publish: all
	@npm test
	@npm publish

dist/pamphlet.debug.js: index.js node_modules
	@echo 'Building $@'
	@./node_modules/.bin/browserify $< -s Pamphlet -o $@ --debug

dist/pamphlet.min.js: index.js node_modules
	@echo 'Building $@'
	@./node_modules/.bin/browserify $< -s Pamphlet -o $@ -p tinyify

node_modules: package.json
	@npm install
	@touch $@
