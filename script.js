console.log(" Welcome to my Bouncing Balls ")

// grab the canvas element in html

var canvas = document.getElementById("canvas")

// defining a 2d canvas, so we can make use of 2d canvas function

var c = canvas.getContext("2d")  

// set width and height of the canvas

var tx =  window.innerWidth 

var ty = window.innerHeight

canvas.width = tx

canvas.height = ty

// set size of canvas when it touches the mouse

var mousex = 0

var mousey = 0

addEventListener("mousemove" , function() {

	mousex = event.clientX

	mousey = event.clientY

	console.log(mousex , mousey)

})

var grav = 0.99

c.strokeWidth = 5

function randomColor() {

	return (

		"rgba(" + 

			Math.round(Math.random() * 250) +

			"," +

			Math.round(Math.random() * 250) +

			"," +

			Math.round(Math.random() * 250) +

			"," +

			Math.ceil(Math.random() * 10) / 10 +

		")"

	)

}

function ball() {

	this.color = randomColor()

	this.radius = Math.random() * 20 + 14

	this.startRadius = this.radius

	// position on x and y axes

	this.x = Math.random() * (tx - this.radius * 2) + this.startRadius

	this.y = Math.random() * (ty - this.radius)

	// change in position on x and y axes

	this.dy = Math.random() * 2

	this.dx = Math.round(Math.random() - 0.5 + 10)

	// velocity of movement of ball

	this.vel = Math.random()/5

	// change in position of ball

	this.update = function(){

		// start movement

		c.beginPath()

		// draw a full circle

		c.arc(this.x , this.y , this.radius , 0 , 2 * Math.PI)

		c.fillStyle = this.color

		c.fill()

	}

}

// create an array of balls

var balls = []

for (var i = 0; i < 100; i++) {

	balls.push(new ball())

}

// animate the balls

function animate() {

	if (tx != window.innerWidth || ty != window.innerHeight) {

		tx = window.innerWidth ;

		ty = window.innerHeight ;

		canvas.width = tx ;

		canvas.height = ty ;

	}

	requestAnimationFrame(animate) ;

	c.clearRect(0 , 0 , tx , ty) ;	

	for (var i = 0 ; i < balls.length ; i++) {

		balls[i].update() ;

		balls[i].y += balls[i].dy ;

		balls[i].x += balls[i].dx ;

		if(balls[i].y + balls[i].radius >= ty) {

			balls[i].dy = -balls[i].dy * grav ; 

		}

		else {

			balls[i].dy += balls[i].vel ;

		}

		if(balls[i].x + balls[i].radius > tx || balls[i].x - balls[i].radius < 0) {

			balls[i].dx = -balls[i].dy ;

		}

		if(mousex > balls[i].x - 20 &&

			mousex < balls[i].x + 20 &&

			mousey > balls[i].y - 50 &&

			mousey < balls[i] .y + 50 &&
			
			balls[i].radius < 70) {

				balls[i].radius += 5 ;

		}

		else {

			if(balls[i].radius > balls[i].startRadius) {

				balls[i].radius += -5 ; 

			}

		}

	}

}

animate()

setInterval(function() {

	balls.push(new ball())

	balls.slice(0 , 1)

} , 400)