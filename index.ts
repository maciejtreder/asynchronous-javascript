function saySomethingNice():void {
	console.log(`Nice to meet you.`);
}

function greet(name: string): void {
    setTimeout(() => console.log(`Hello ${name}!`), 0);
    saySomethingNice();
}
 

greet(`John`);
