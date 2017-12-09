const canvas = document.getElementById('pong');
canvas.width = 700;
canvas.height = 500;
const ctx = canvas.getContext('2d');

let leftPlayer = {
	x:0,
	y: canvas.height/2 - 25,
	width:10,
	height: 75,
	yDir:0,
	speed:5,
	score: 0
}
let rightPlayer = {
	x:canvas.width - 10,
	y: canvas.height/2 - 25,
	width:10,
	height: 75,
	yDir:0,
	speed:5,
	score: 0
};
let ball = {};

let gameIsOn = true;

const spawnBall = function(leftWon) {
	ball = {
		width: 10,
		height: 10,
		x: (canvas.width/2) + (leftWon ? -50 : 50),
		y: Math.floor(Math.random()*(canvas.height-20)),
		xDelta: leftWon ? -5 : 5,
		yDelta: Math.random() > 0.5 ? 5 : -5
	};
};

const drawLine = function() {
	ctx.beginPath();
	ctx.setLineDash([15, 15]);
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2, canvas.height);
	ctx.stroke();
};

const draw = function() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = "white";
	drawLine();

	ctx.fillStyle = "white";
	ctx.fillRect(leftPlayer.x, leftPlayer.y, leftPlayer.width, leftPlayer.height);
	ctx.fillRect(rightPlayer.x, rightPlayer.y, rightPlayer.width, rightPlayer.height);

	ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

	ctx.font = "50px Courier";
	ctx.fillText(leftPlayer.score, canvas.width/2 - 50, 60);
	ctx.fillText(rightPlayer.score, canvas.width/2 + 25, 60);
};

const update = function() {
	leftPlayer.y += leftPlayer.yDir * leftPlayer.speed;
	rightPlayer.y += rightPlayer.yDir * rightPlayer.speed;

	if(leftPlayer.y < 0 || leftPlayer.y > canvas.height - leftPlayer.height) {
		leftPlayer.y -= leftPlayer.yDir * leftPlayer.speed;
	}
	if(rightPlayer.y < 0 || rightPlayer.y > canvas.height - rightPlayer.height) {
		rightPlayer.y -= rightPlayer.yDir * rightPlayer.speed;
	}

	ball.x += ball.xDelta;
	ball.y += ball.yDelta;

	if (ball.y > canvas.height-ball.width || ball.y < 0) {
		ball.yDelta *= -1;
	}

	if (ball.x < - ball.width) {
		rightPlayer.score += 1;
		spawnBall(false);
	}
	if (ball.x > canvas.width) {
		leftPlayer.score += 1;
		spawnBall(true);
	}

	if (leftPlayer.score === 10) {
		alert("Left player won");
		gameIsOn = false;
	}
	if (rightPlayer.score === 10) {
		alert("Right player won");
		gameIsOn = false;
	}

	if (ball.xDelta > 0 && ball.y > rightPlayer.y && ball.y < rightPlayer.y + rightPlayer.height && ball.x > canvas.width - rightPlayer.width) {
		ball.xDelta *= -1;
	}

	if (ball.xDelta < 0 && ball.y > leftPlayer.y && ball.y < leftPlayer.y + leftPlayer.height && ball.x < leftPlayer.width) {
		ball.xDelta *= -1;
	}
};

const loop = function () {
	draw();
	update();

	if (gameIsOn) {
		requestAnimationFrame(loop);
	}
};


const upKey = 38;
const downKey = 40;
const wKey = 87;
const sKey = 83;

document.addEventListener('keydown', e => {
    e.preventDefault();
    const keyCode = e.keyCode;
    if(keyCode === wKey)
        leftPlayer.yDir = -1;
    else if(keyCode === sKey)
        leftPlayer.yDir = 1;
    else if(keyCode === upKey)
        rightPlayer.yDir = -1;
    else if(keyCode === downKey)
        rightPlayer.yDir = 1;
});
document.addEventListener('keyup', e => {
    e.preventDefault();
    const keyCode = e.keyCode;
    if(keyCode === sKey || keyCode === wKey) {
        leftPlayer.yDir = 0;
    } else if(keyCode === upKey || keyCode === downKey) {
        rightPlayer.yDir = 0;
    }
});

spawnBall(false);

