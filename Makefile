.PHONY: all package

BIN := ./node_modules/.bin/
DEPS := src/pamphlet.js $(wildcard src/*) node_modules

all: dist/pamphlet.js dist/esm/pamphlet.min.js dist/esm/pamphlet.js dist/umd/pamphlet.min.js dist/umd/pamphlet.js

package: all
	@npm test
	@npm publish

dist/esm/pamphlet.min.js: dist/esm/pamphlet.js
	@echo 'Minifying $<'
	@$(BIN)/terser $< -o $@

dist/umd/pamphlet.min.js: dist/umd/pamphlet.js
	@echo 'Minifying $<'
	@$(BIN)/terser $< -o $@

dist/pamphlet.js: $(DEPS) rollup/common.js
	@$(BIN)/rollup -i $< -o $@ -c ./rollup/common.js -f cjs

dist/esm/pamphlet.js: $(DEPS) rollup/bundle.js
	@$(BIN)/rollup -i $< -o $@ -c ./rollup/bundle.js -f es

dist/umd/pamphlet.js: $(DEPS) rollup/bundle.js
	@$(BIN)/rollup -i $< -o $@ -c ./rollup/bundle.js -f umd -n Pamphlet

node_modules: package.json
	@npm install
	@touch $@
