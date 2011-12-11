var ringBuffer = require('./ringBuffer');

var buffer = ringBuffer.ringBuffer(3);
var i = 1;

// reading from empty buffer yields 'undefined', no error
console.log(buffer.read());

// write and read from buffer
buffer.write('it works!');
console.log(buffer.read());

// write 5 times in the buffer of size 3
for(i=1; i<=5; i++){
	buffer.write(i);
}

// read 5 times form the buffer of size 3 (while no one write in it)
// will just return the last three written elements
for(i=1; i<=5; i++){
	console.log(buffer.read());
}

