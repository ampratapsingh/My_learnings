// String handbook

// String: length, indexOf(), lastIndexOf(), slice(), substring(), replace(),
// split(), trim(), toUpperCase(), toLowerCase(), etc.


//Length
function getLength(str){
  console.log(str.length);
}
getLength("Hello World");


//Index Of
function getIndex(str, target){
  console.log(str.indexOf(target));
}
getIndex("Hello World", "World");


//LastIndexOf
function findLastIndexOf(str, target){
  console.log(str.lastIndexOf(target));
}
findLastIndexOf("Hello World", "l");



//Slice
function getSlice(str, start, end){
  console.log(str.slice(start, end));
}
getSlice("Hello World", 1, 8);


//Substring
function getSubstring(str, start, end){
  console.log(str.substring(start, end));
}
getSubstring("Hello World", 0, 6);


/*
| Feature          | `slice()`                                        | `substring()`                                                    |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Negative indexes | ✅ Works (counts from end)                        | ❌ Treated as `0`                                                 |
| If `start > end` | Returns `""`                                     | Swaps values automatically                                       |
| Typical use case | When you want flexibility with negative indexing | When you want safe extraction without worrying about index order |
*/


//Replace
function getReplace(str, target, replacement){
  console.log(str.replace(target, replacement));
}
getReplace("Hello World", "ll", "e");


//Split
function getSplit(str, target){
  console.log(str.split(target));
}
getSplit("Hello World", "e");


//Trim
function getTrim(str){
  console.log(str.trim());
}
getTrim("       Hello World");
