// Synchronous code
console.log(1);
console.log(2);
console.log(3);
console.log(4);

// Callback Asynchronous code (ex. addEventListener)

console.log('Before');
setTimeout(function() {
    console.log('Middle');
}, 0);
console.log('After');

