[![NPM Version](http://img.shields.io/npm/v/object-change.svg?style=flat)](https://npmjs.org/package/object-change)
[![Build Status](http://img.shields.io/travis/royriojas/object-change.svg?style=flat)](https://travis-ci.org/royriojas/object-change)

# object-change
Simple utility to be able to attach listeners to events that fired when an object property changes

## Overview
Basically using this utility on any plain object will create a new object that is an instance of a [dispatcher](https://www.npmjs.com/package/dispatchy)
and that will fire events when the _"observed"_ properties change.

## Install

```bash
npm i --save object-change
```

## Interface

**objChange**( obj:Object, properties:Array<String> ):dispatcher

**Parameters**
- **obj:Object**: The object with the initial values for the proxy instance.
- **properties:Array**: The properties that will trigger the change event when its values change.

Returns
An instance of a dispatcher that fire: 
- a `change` event whenever any observed property changes.
- a `change:NAME_OF_PROP` event whenever the observed property `NAME_OF_PROD` changes

## Example

```javascript
var obj = {
  someProp: '1',
  anotherProp: 2
};

var objChange = require('object-change');

var proxyObj = objChange(obj, ['someProp']);

proxyObj.on('change:someProp', function (e, args) {
  console.log('change from: '+ args.oldValue + ' to: ' + args.newValue);
});

proxyObj.someProp = 'some other value';

// ==> output <==
// change from: 1 to: 'some other value';

proxyObj.anotherProp = 1// doesn't fire change because is not observed.
```

## Important notes and limitations

- The events fire synchronously. So far I haven't had any problems. Make sure you don't do expensive tasks inside the `change` listener
- The dispatcher instance returned have the following methods: 
  - `on`. To add a listener to an event in the dispatcher
  - `fire`. To fire an event on the event dispatcher
  - `off`. To remove the listeners
  The events works similarly to the jQuery `on`/`off`. `fire` is similar to `jQuery.fn.triggerHandler`
- Be aware that the properties should not be named `on`, `fire` or `off`
- **Id does not work on nested properties** this is by design, I just wanted to keep it simple.
- The base object is used as the prototype for the returned object. If you change a nested property, **it will affect the original object**
  I did it this way to avoid having to copy all the properties to the new object, but... I might consider change it in the future
  if it is proven to be a problem.

## Changelog

[Changelog](./changelog.md)

