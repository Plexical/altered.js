MODULES=node_modules
MOCHA=$(MODULES)/mocha
BROWSERIFY_DIR=$(MODULES)/browserify
BROWSERIFY=./$(BROWSERIFY_DIR)/bin/cmd.js

.PHONY: all
all: test

test: mocha
	npm test

.PHONY: mocha
mocha: $(MOCHA)/bin/mocha

$(MOCHA)/bin/mocha:
	npm install

$(BROWSERIFY):
	npm install

browser: $(BROWSERIFY)
	mkdir -p build
	$(BROWSERIFY) -r ./altered -r should -r ./spec/altered-spec > build/browser-testing.bundle.js
