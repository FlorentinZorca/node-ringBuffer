var EventEmitter = require('events').EventEmitter;

var ringBuffer = function(size){
	if(!size || size<=1)
		throw new Error('Size must be a positive integer greater than one');
	var buffer = [], readHead = 0, writeHead = 0, itemCount = 0;
	var move = function(value){return (value+1)%size;}

	var read = function () {
		var ret;
		if(itemCount==0) return undefined;
		else {
			ret = buffer[readHead];
			buffer[readHead] = undefined; // consume/remove reference
			readHead = move(readHead);
			itemCount--;
			return ret;
		}
	}
	
	var write = function (value) {
		if(itemCount==size) readHead = move(readHead); // skip the oldest element, because it's about to be overwritten
		else itemCount++;
		
		buffer[writeHead] = value;
		writeHead = move(writeHead);
	}
	
	var count = function (){return itemCount;}
	
	var log = function(){
		console.log("readHead: " + readHead + ", writeHead: " + writeHead + ", itemCount: " + itemCount);
		var i, s="Items: ";
		for(i=0; i<size; i++){
			if(i>0) s = s + ", ";
			s = s + "'" + buffer[i] + "'";
		}
		console.log(s);
	}
	return{
		read: read,
		write: write,
		count: count,
		log: log}
}

var asyncRingBuffer = function(size){
	var realBuffer = ringBuffer(size);
	var emitter = new EventEmitter();
	var eventName = 'data';

	var asyncRead = function(callback){
		if(realBuffer.count()>0){ //read(callback); // synchronous
			var value = realBuffer.read();
			if(typeof callback==='function')callback(null, value);
		}else{ // subscribe to the next value
			emitter.once(eventName, function(){asyncRead(callback);});
		}
	}

	var write = function(value, callback){
		realBuffer.write(value);
		emitter.emit('data');
		if(typeof callback==='function')
			callback(null, value);
	}

	return{
	read: asyncRead,
	write: write,
	count: realBuffer.count,
	log: realBuffer.log}
}

exports.ringBuffer = ringBuffer;
exports.asyncRingBuffer = asyncRingBuffer;