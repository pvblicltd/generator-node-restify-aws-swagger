# generator-madlib-restify-api
[![Build Status](https://travis-ci.org/Qwerios/generator-madlib-restify-api.svg?branch=master)](https://travis-ci.org/Qwerios/generator-madlib-restify-api)  [![NPM version](https://badge.fury.io/js/generator-madlib-restify-api.png)](http://badge.fury.io/js/generator-madlib-restify-api)

[![Npm Downloads](https://nodei.co/npm/generator-madlib-restify-api.png?downloads=true&stars=true)](https://nodei.co/npm/generator-madlib-restify-api.png?downloads=true&stars=true)

A [Yeoman](http://yeoman.io) based generator for a restify based API project. Includes a madlib XDM provider, swagger based documentation, bunyan based logger and json based configuration file that is generated on first run.


## Getting Started

Validation uses: https://github.com/z0mt3c/node-restify-validation

API documentation is based on Swagger: https://github.com/wordnik/swagger-spec

Unit testing is done with Mocha: https://github.com/mochajs/mocha
Assertion library used is chai: https://github.com/chaijs/chai

Code coverage is done with blanket.js: https://github.com/alex-seville/blanket/
With the mocha cobertura reporter: https://github.com/sjonnet19/mocha-cobertura-reporter

The GruntFile will produce an output that can be hooked up to a Jenkins project.
Artifacts end up in: dist/artifacts
Unit test results are in dist/coverage/test-results.xml
Coverage report is in dist/coverage/coverage.xml

You need the cobertura plugin installed on Jenkins for the coverage report result to show in your project. An HTML version is also generated of the coverage report in dist/coverage/coverage.html.

The script to build in jenkins would be:
```bash
npm install
npm test
```

During development you can get a console based unit test result with `grunt test`. The `npm test` script is hooked up to the `grunt coverage` tasks to generate all the reports and coverage files for a Jenkins project.

There is a sub-generator available to create new routes of the API. Run `yo madlib-restify-api:route` to start it.

### CoffeeScript based

This generator used to have a JavaScript alongside the CoffeeScript option. I decided to take it out because it became too much work to maintain both variants and I didn't really use the pure JavaScript version myself. So any code or updates I wrote would only be tested for the CoffeeScript version.

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-madlib-restify-api from npm, run:

```bash
$ npm install -g generator-madlib-restify-api
```

Finally, initiate the generator:

```bash
$ yo madlib-restify-api
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
