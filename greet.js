function saySomethingNice() {
    console.log(`Nice to meet you.`);
}

function greet(name) {
    setTimeout(() => console.log(`Hello ${name}!`), 0);
    saySomethingNice();
} 

greet('John');