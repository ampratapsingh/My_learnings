const x: number = 1;
console.log(x);


function greet(s:string){
  console.log(s);
}
greet("hello");


function sum(x:number, y:number):number{
  return x + y;
}
const value = sum(1, 2);
console.log(value); 


function delayedCall(f: () => void){
  setTimeout(f, 1000);
}
delayedCall(() => console.log("hello"));


interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

function isLegal(user: User){
  if(user.age >= 21){
    return true;
  }
  else{
    return false;
  }
}

const user = {
  firstName: "John",
  lastName:  "Smith",
  email: "9iMlR@example.com",
  age: 21,
}

isLegal(user);


/*
interface TodoTyppe{
  id: number;
  title: string;
  done: boolean;
}

function Todo(todo: TodoType) {
  return(
  <div>
    <h1>{todo.title}</h1>
    <h2>{todo.id}</h2>
  </div>
  )
}
*/

type User2 = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

type stringNumber = string | number;

function printId(id: stringNumber) {
  console.log(id);
}

printId("hello");
printId(1);

type Employee = {
  id: stringNumber;
  name: string;
}

type manager = {
  name : string;
  department: string;
}

type TeamLead = Employee & manager;

const teamLead:TeamLead = {
  id: 1,
  name: "John",
  department: "IT"
}

interface User {
	firstName: string;
	lastName: string;
	age: number;
}

function filteredUsers(users: User[]) {
    return users.filter(x => x.age >= 18);
}

console.log(filteredUsers([{
    firstName: "John",
    lastName: "Smith",
    email: "9iMlR@example.com",
    age: 18
}]))






//tsc -b
