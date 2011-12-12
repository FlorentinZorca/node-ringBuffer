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