function tag(static, ...arg) {
    console.log(static);
    console.log(arg);
}

const name = 'Pesho';
const age = 30;

tag`Hello my name is ${name} and I'm ${age} old!`;
