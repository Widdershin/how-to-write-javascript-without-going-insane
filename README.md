How to write JavaScript without going insane
===

-----

This talk:

 * Practical tips
 * Little code snippets
 * Mix of dos, donts and useful tools


-----

`this` is undefined
===

Bad:
```js
$('a.link').on('click', function () {
  this.preventDefault();
});
```

Good:
```js
$('a.link').on('click', function (event) {
  event.preventDefault();
});
```

-----

how `this` actually works

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

-----
