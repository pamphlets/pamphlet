.PHONY: all package

BIN := ./node_modules/.bin/
DEPS := lib/pamphlet.js $(wildcard lib/*) node_modules

all: dist/esm/pamphlet.min.js dist/esm/pamphlet.js dist/umd/pamphlet.min.js dist/umd/pamphlet.js

package: all
	@npm test
	@npm publish

dist/esm/pamphlet.min.js: dist/esm/pamphlet.js
	@echo 'minifying $<'
	@$(BIN)/terser $< -o $@

dist/umd/pamphlet.min.js: dist/umd/pamphlet.js
	@echo 'minifying $<'
	@$(BIN)/terser $< -o $@

dist/esm/pamphlet.js: $(DEPS)
	@echo 'building $@'
	@$(BIN)/fastroll $< -o $@ -f es -m default

dist/umd/pamphlet.js: $(DEPS)
	@echo 'building $@'
	@$(BIN)/fastroll $< -o $@ -f umd -n Pamphlet -m default

node_modules: package.json
	@npm install
	@touch $@
