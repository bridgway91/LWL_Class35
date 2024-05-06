import moment from 'moment'

console.log('Hello from JavaScript!!')
console.log(moment().startOf('day').fromNow());
console.log(moment().endOf('day').fromNow());


const name = "Bob"
const time = "today"
console.log(`Hello ${name}, how are you ${time}?`)