.PHONY: all publish

DEPS := src/pamphlet.js $(wildcard src/*) node_modules

all: dist/pamphlet.js dist/pamphlet.esm.js dist/pamphlet.umd.js

publish: all
	@npm test
	@npm publish

dist/pamphlet.js: $(DEPS)
	@./node_modules/.bin/rollup -i $< -f cjs -o $@

dist/pamphlet.esm.js: $(DEPS) rollup.config.js
	@./node_modules/.bin/rollup -i $< -f es -o $@ -c

dist/pamphlet.umd.js: $(DEPS) rollup.config.js
	@./node_modules/.bin/rollup -i $< -f umd -o $@ -n Pamphlet -c

node_modules: package.json
	@npm install
	@touch $@
