MOCHA_FOLDER = node_modules/grunt-mocha
EXAMPLE_FOLDER = example/test

test:
	grunt default

install:
	npm install
	mkdir libs
	mv $(MOCHA_FOLDER)/$(EXAMPLE_FOLDER)/js/chai.js libs/chai.js
	mv $(MOCHA_FOLDER)/$(EXAMPLE_FOLDER)/js/mocha.js libs/mocha.js
	mv $(MOCHA_FOLDER)/$(EXAMPLE_FOLDER)/css/mocha.css libs/mocha.css
	mv $(MOCHA_FOLDER)/phantomjs/bridge.js libs/bridge.js
	@echo done

clean:
	rm -rf libs
	rm -rf node_modules