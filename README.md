# RingBuffer

This is a simple JavaScript implementation of circular (or ring) buffers. 
It is intended for the use with node.js. I have created this small project
because I wanted to try the npm registry (http://npmjs.org/) but with 
something slightly more useful than a "hello world".

## How to Install

    npm install ringbuffer

## How to use
```js
// first, require ringbuffer
var ringBuffer = require('ringbuffer');

// create a tiny buffer of size 3
var buffer = ringBuffer.ringBuffer(3);
var i;

// reading from empty buffer yields 'undefined', no error
console.log(buffer.read());

// write and read from buffer
buffer.write('it works!');
// note: reading 'consumes' (dereferences) the item from buffer
console.log(buffer.read());

// write 5 times in the buffer of size 3
for(i=1; i<=5; i++){
    buffer.write(i);
}

// read 5 times from the buffer of size 3 (while no one write in it)
// will just return the last three written elements
for(i=1; i<=5; i++){
    console.log(buffer.read());
}
```

## Licence

(The MIT License)

Copyright (c) 2011 Florentin Zorca

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

