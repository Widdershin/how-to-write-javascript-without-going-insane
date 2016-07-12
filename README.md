How to write JavaScript without going insane
===

Because it's clearly too late for me.

-----

What is this talk?
---

 * Practical tips
 * Little code snippets
 * A mixture of dos, donts and useful tools

What is this talk not?
---

 * A pitch for any particular framework
 * A suggestion that you should write JavaScript, merely how to survive if you do.

-----

Objects
===

-----

Here is one way to make an object in Javascript.

```js
function Person (name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(this.name);
}

var person = new Person('Sofia');

person.sayName();
// => 'Sofia'
```
-----

Here is another.

```js
var person = {
  name: 'Sofia'
}

function sayName (person) {
  console.log(person.name);
}

sayName(person);
// => 'Sofia'
```

-----

Sometimes we want a number of similar objects.

```js
function Person (name) {
  return {
    name: name,

    kind: 'human'
  }
}

function sayName (person) {
  console.log(person.name);
}

var person = Person('Sofia');

sayName(person);
// => 'Sofia'
```

-----

Why though?
===

-----

Because of `this`.

The value of `this` in a function depends upon how it is called:
<!-- skip-example -->
```js
window.name = 'wat';

var person = {
  name: 'Charlie',
  sayName: function () {
    console.log(this.name);
  }
}

person.sayName();
// => 'Charlie'

var sayName = person.sayName;

sayName();
// => 'wat'
```

`this` can lead to some confusing bugs.

-----

Avoiding `this`
---

Instead of:
```js
$('a.link').on('click', function () {
  this.preventDefault();
});
```

Try:
```js
$('a.link').on('click', function (event) {
  event.preventDefault();
});
```

-----

Name your functions
---

Instead of:
```js
$('a.link').on('click', function (event) {
  // do a thing
});
```

Try:
```js
$('a.link').on('click', function doAThing (event) {
  // do a thing
});
```

Even better:
```js
function doAThing (event) {
  // do a thing
}

$('a.link').on('click', doAThing);
```

-----

Classes and inheritance
---

Classes and inheritance are at odds with the most elegant parts of JavaScript.

To avoid insanity, they are best avoided.

-----

`window`
---

```js
// widget.js
if (!window.OurBusiness) {
  window.OurBusiness = {};
}

window.OurBusiness.Widget = Widget;
```

```js
// main.js
var Widget = window.OurBusiness.Widget;

new Widget().go();
```

Problems:

 * Everything is global.
 * What loads first? Let the web decide.
 * Hard to test

-----

Instead, modules:

```js
// widget.js
module.exports = Widget;
```

```js
// main.js
var Widget = require('./widget');

new Widget().go();
```

Benefits:
 * You can see where things come from
 * No more globals
 * Much easier to package things up

-----

Hang on, how can I use modules in a browser?
---

`browserify`!

```js
// main.js
var Widget = require('./widget');

new Widget().go();
```

`browserify` compiles your node code so that it can be used in the browser.

```bash
$ npm install browserify -g

$ browserify main.js -o bundle.js
```

```html
<script type="text/javascript" src="bundle.js"></script>
```

-----

Wait, npm and node? What does this have to do with the browser?
---

`npm` is the easiest way to install and manage dependencies in a JavaScript project.

Writing code that runs on `node` has some nifty advantages though:
  * Can run same code on client and server
  * Can run unit tests without needing a browser
  * With `browserify`, can use most of `npm` on the web.

-----

Test your code
---

I like to use a command line runner like `mocha`, because it's similar to `rspec` and has great file watching/autorun functionality built in.

Lots of people like `tape`, which is cool too.

Most of the time I don't even need a browser for my tests, or I only run some with a browser.

-----

ES2015
---

I write most everything in ES2015, because I find it has some niceties I enjoy.

Not all parts of ES2015 are that great, in my opinion. I tend to avoid classes/inheritance, because I prefer the relative simplicity of objects + functions.

You might not need...
---

* JavaScript
* jQuery
* ES2015
* npm
* A framework
* A database
* A server

But sometimes they can be useful.

-----

debugger + chrome debugger

-----

console.*

-----

consider immutable objects yo

-----

iteration

-----

case statements vs objects

-----

linter

-----

lodash

