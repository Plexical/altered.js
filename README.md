# Altered.js

***TL;DR:*** *Reversible state changes, Javascript version.*

This module is a port of my similarly named Python module,
[Altered States](https://github.com/Plexical/altered.states). It's
purpose is reversible state changes aimed at e.g. testing. The
'Altered.js' name is mostly to distinguish from it's Python
counterpart, from here on I'll refer to it as 'Altered States' too,
and mean the Javascript version.

Altered States is mostly meant to handle setup/tear down of test
fixtures. For the Javascript version, that means that the after the
environment is modified, either:

## 1. One-shot modifications with a callback

You modify your world, and a provide a callback to be called after the
modifications are applied. When the callback returns, the
modifications will be restored (Node.js CLI repl commands shown):

    > var state = require('altered.js').state
    undefined
    > var object = {a: 1}
    undefined
    > state(object, {a: 2}, function() { console.log(object) })
    { a: 2 }        // output of `console.log` inside the callback
    { a: 1 }        // original is also returned

For Altered State to be able to restore the state you will need to let
Altered States perform your modifications via a difference object
("diff object" below). In the example above, the property `a` gets
overwritten with a new value. A diff object can also add properties:

    > state(object, {b: 2}, function() { console.log(object) })
    { a: 1, b: 2 }  // propery `b` added
    { a: 1 }        // property `b` no longer present after restore

Setting a property to  `undefined` will "forget" (perform temporary
removal of) that propery:

    > state(object, {a: undefined}, function() { console.log(object) })
    {}              // property `a` not present
    { a: 1 }        // restored

*(Note: I'm still unsure if `undefined` really is the best marker for
"forgetting" a property)*

## 2. Two-step modification

As an alternative, you can also set up a modification and have a
restore function returned to you that you can call yourself at a later
time. You do this via the `change` function instead:

    > // Assumes a new session
    > var change = require('altered.js').change
    undefined
    > var object = {a: 1}
    undefined
    > var restore = change(object, {a: 2}); // returns a function
    undefined
    > object
    { a: 2 }
    > restore()
    undefined
    > object
    { a: 1 }  // now restored

The same alteration rules as in section 1 is used when `change` is
called instead of `state`.

## Modifying the code

The script is actually very short, hence there are no subdirectories
in the project, so modifying it yourself should be simple. Classic
`make` in combination with `npm` is used to build. A simple `make
test` should be enough to set up a newly cloned directory for
development. If it isn't please open an issue and I'll look into it.
