.PHONY: all publish

BIN := ./node_modules/.bin/
DEPS := src/pamphlet.js $(wildcard src/*) node_modules

all: dist/pamphlet.js dist/esm/pamphlet.js dist/umd/pamphlet.js

publish: all
	@npm test
	@npm publish

dist/pamphlet.js: $(DEPS) rollup/common.js
	@$(BIN)/rollup -i $< -o $@ -c ./rollup/common.js -f cjs

dist/esm/pamphlet.js: $(DEPS) rollup/bundle.js
	@$(BIN)/rollup -i $< -o $@ -c ./rollup/bundle.js -f es

dist/umd/pamphlet.js: $(DEPS) rollup/bundle.js
	@$(BIN)/rollup -i $< -o $@ -c ./rollup/bundle.js -f umd -n Pamphlet

node_modules: package.json
	@npm install
	@touch $@
