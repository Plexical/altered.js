MODULES=node_modules
MOCHA=$(MODULES)/mocha

.PHONY: all
all: test

test: mocha
	npm test

.PHONY: mocha
mocha: $(MOCHA)/bin/mocha

$(MOCHA)/bin/mocha:
	npm install
