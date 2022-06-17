import myLocation, { message, name, getGreeting } from './myModule';
import myAdd, { subtract } from './math';

console.log(name);
console.log(myLocation);
console.log(message);
console.log(getGreeting(name));

console.log(myAdd(1, 2));
console.log(subtract(5, 3));
