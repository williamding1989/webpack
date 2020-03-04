class Greeter{
	greeting: String;
	constructor(msg:String){
		this.greeting = msg
	}
	greet(){
		return 'hello'+ this.greeting
	}
}

let greeter = new Greeter('world')
let button = document.createElement('button')
button.textContent = 'say Hello'
button.onclick = function(){
	alert(greeter.greet())
}
document.body.appendChild(button)