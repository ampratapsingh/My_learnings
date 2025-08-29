const fs = require('fs');

function readFile(cb){
  return new Promise(function(resolve){
    fs.readFile("a.txt", "utf-8", function(err, data){
      resolve(data);
    })
  })
}

function OnDone(data){
  console.log(data);
}

readFile().then(OnDone);


/*
🔹 What is a Promise?

A Promise in JavaScript represents a value that may be available now, in the future, or never.

It’s used for asynchronous operations (like API calls, file reading, timers, etc.).

Think of it like: “I promise I’ll give you the result later — either success or failure.”

*/


function myAsyncFunction(){
  let p = new Promise(function(resolve, reject){
    setTimeout(resolve, 1000);
  });
  return p;
}

const value = myAsyncFunction(); //Gives immediate value
value.then(function(){
  console.log("Promise resolved"); //Runs after Promise is resolved
})
console.log(value);