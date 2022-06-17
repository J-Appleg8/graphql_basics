const message = 'Some message from myModule.js';
const name = 'James';
const location = 'Long Beach';

const getGreeting = name => {
  return `Welcome to the course ${name}`;
};

export { message, name, getGreeting, location as default };
