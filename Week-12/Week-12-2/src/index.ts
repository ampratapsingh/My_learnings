interface User {
  name: string;
  age: number;
}

function sumOfAge(user1 : User, user2 : User): number {
  return user1.age + user2.age;
}

const result = sumOfAge({ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 });
console.log(`The sum of ages is: ${result}`);


interface User2 {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

type UserProfile = Pick<User2, 'name' | 'email'>;
const displayUserProfile = (user: UserProfile) => {
  console.log(`Name: ${user.name}, Email: ${user.email}`);
}
displayUserProfile({name : 'Prince', email:'a@b.com'});


type UpdateProps = Pick<User2, 'name' | 'email'>;
type UpdatePropsPartial = Partial<UpdateProps>;
function updateUser(updatedProps: UpdatePropsPartial) {
  console.log('Updated properties:', updatedProps);
}
updateUser({name : 'Ali'});


interface Config {
  endpoint : string;
  apiKey : string;
}

const config: Readonly<Config> = {
  endpoint: 'https://api.publicapis.org/entries',
  apiKey: '12345',
}


interface User3 {
  id : string,
  name : string,
}
type Users3 = Record<string, User3>;
const users: Users3 = {
  'abc123' : { id: 'abc123', name: 'Alice' },
  'def456' : { id: 'def456', name: 'Bob' },
}
console.log(users['abc123']); // Alice


interface User4 {
  id : string,
  name : string
}
const usersMap = new Map<string, User4>();
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

console.log(usersMap.get('abc123'));
