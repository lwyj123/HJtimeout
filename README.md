# HJtimeout
This is a timeout and interval extension use es6, the reason why I develop this thing is that a bug in my program and I can't find what's wrong because I can't view all the timouts/intervals in javascript.

# Install

Waiting for deploy

# Usage
### HJtimeout.timer(callback, millisec)

`callback` a function of your callback.

`millisec` a time for setTimeout.

### HJevent.cancelTimer(id)

`id` a id of the Timer you wanna cancel.


Example

```js
var timer = new HJtimeout();
timer.timer(function() {
    alert('timerfinished');
}, 2000);
```