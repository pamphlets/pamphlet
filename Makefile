.PHONY: all publish

all: dist/pamphlet.js dist/pamphlet.esm.js dist/pamphlet.umd.js

publish: all
	@npm test
	@npm publish

dist/pamphlet.js: lib/pamphlet.js node_modules rollup.config.js
	@./node_modules/.bin/rollup -i $< -f cjs -o $@ -c

dist/pamphlet.esm.js: lib/pamphlet.js node_modules rollup.config.js
	@./node_modules/.bin/rollup -i $< -f es -o $@ -c

dist/pamphlet.umd.js: lib/pamphlet.js node_modules rollup.config.js
	@./node_modules/.bin/rollup -i $< -f umd -o $@ -n Pamphlet -c

node_modules: package.json
	@npm install
	@touch $@
