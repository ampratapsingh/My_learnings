// Array handbook

// Array:   push(), pop(), shift(), unshift(), splice(), slice(),
// concat(), forEach(), map(), filter(), reduce(), find(), sort()

// Run each function to see the output, play and learn by doing.


//Push
function pushArray(arr, value){
  arr.push(value);
  console.log(arr);
}
pushArray([1, 2, 3], 4);


//Pop
function popArray(arr){
  arr.pop();
  console.log(arr);
}
popArray([1, 2]);


//Shift
function shiftArray(arr){
  const first = arr.shift();
  console.log(first);
  console.log(arr);
}
shiftArray([1, 2, 3, 4, 5]);


//Unshift
function unshiftArray(arr, value){
  arr.unshift(value);
  console.log(arr);
}
unshiftArray([1, 2, 3], 100);


//Splice
function spliceArray(arr, index){
  arr.splice(index, 1);  //delete 4 from the array starting from index 1
  console.log(arr);
}
spliceArray([1, 2, 3, 4, 5], 4);
// array.splice(start, deleteCount, item1, item2, ...);


//Slice
function sliceArray(arr, start, end){
  const newArr = arr.slice(start, end);
  console.log(newArr);
}
sliceArray([1, 2, 3, 4, 5], 1, 4);


//Concat
function concatArray(arr1, arr2){
  const newArr = arr1.concat(arr2);
  console.log(newArr);
}
concatArray([1, 2, 3], [4, 5, 6]);


//Map
function mapExample(arr){
  console.log("Original Array:", arr);
  const newArr = arr.map(function(item){
    return item*2;
  })
  console.log("New Array:", newArr);
}
mapExample([1, 2, 3]);
/**
Key Points

Always returns a new array of the same length.

Doesn’t modify the original array.

map() = "Take this array, run a function on each element, and give me back a new transformed array."
 */


//Filter
function filterExample(arr){
  console.log("Original Array:", arr);
  const newArr = arr.filter(function(item){
    return item % 2 === 0;
  })
  console.log("New Array:", newArr);
}
filterExample([1, 2, 3, 4, 5]);


/*
| Feature              | `map()`                | `filter()`                        |
| -------------------- | ---------------------- | --------------------------------- |
| Purpose              | Transform elements     | Select elements                   |
| Return Length        | Same as original       | ≤ original (can be empty)         |
| Return Value         | New transformed values | Subset of original values         |
| Callback Must Return | The new element        | `true` (keep) / `false` (discard) |
*/


//Find
function findExample(arr){
  console.log("Original Array:", arr);
const FirstOddNumber = arr.find(function(item){
  return item % 2 !== 0;
})
console.log("First Odd Number:", FirstOddNumber);
}
findExample([1, 2, 3, 4, 5]);



//forEach
function forEachExample(arr){
  console.log("Original Array:", arr);
  const newArr = [];
  arr.forEach(function(item){
    newArr.push(item*2);
  })
  console.log("New Array:", newArr);
}
forEachExample([1, 2, 3]);

/*
What forEach() does

Executes a function once for each element in the array.

Does not return a new array (unlike map, filter).

Mostly used when you want to perform side effects (like printing, updating variables, etc.).

Does not modify the original array (unless you explicitly change its elements inside).
*/

