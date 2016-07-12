How to write JavaScript without going insane
===

Because it's clearly too late for me.

-----

What is this talk?
---

 * Practical tips
 * Little code snippets
 * Mix of dos, donts and useful tools

-----

What is this talk not?
---

 * A pitch for any particular framework
 * A pitch for JavaScript as a language

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

fuck oo, prototypes and classes in js

-----

functions and data

-----

no more `window`

-----

es6 plz

-----

tests

-----

name your functions

-----

you don't need jQuery or frameworks

(but sometimes they're nice)

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

