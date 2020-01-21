<!--
 * @Author: your name
 * @Date: 2019-12-05 13:28:09
 * @LastEditTime: 2019-12-11 15:25:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workplace\MyLearning\iview-G6\src\view\demo\radio\index.vue
 -->
<template>
    <div class="content">
        <canvas></canvas>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        let af;
        const numLasers = 30;
        const tail = 60;
        const canvas = document.querySelector("canvas");
        const ctx = canvas.getContext("2d");
        const createLasers = n => {
            const lasers = [];
            for (let i = 0; i < n; ++i) {
                //在对应范围内生成x轴、y轴的点，以及移动速度
                lasers.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    s: Math.random() * 2 + 4
                });
            }
            return lasers;
        };
        const renderLaser = l => {
            //给每个点加尾巴以及移动路径
            const grad = ctx.createLinearGradient(l.x, l.y, l.x, l.y + tail);
            const a = 1 - (canvas.height - l.y) / canvas.height * 0.8;
            grad.addColorStop(0, `hsla(340,400%,400%,${a})`);
            grad.addColorStop(1, "hsla(340,400%,50%,0)");
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(l.x, l.y);
            ctx.lineTo(l.x, l.y + tail);
            ctx.stroke();
        };
        const updateLaser = l => {
            l.y -= l.s;
            if (l.y < -tail) {
                l.y = canvas.height;
            }
        };
        const render = lasers => {
            // var image1 = new Image();
            // image1.src = 'js/bg4.jpg';
            // image1.onload = function(){
                // var pattern = ctx.createPattern(image1,'no-repeat');
                // ctx.fillStyle = pattern;
                // ctx.fillStyle = "hsl(261,43%,7%)";
                ctx.fillStyle = "rgba(54, 42, 155, 0.09)";
                // ctx.fillStyle = "rgba(255, 255, 255, 0.09)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                for (let l of lasers) {
                    renderLaser(l);
                    updateLaser(l);
                }
                af = requestAnimationFrame(() => render(lasers));
            // }
        };
        const init = () => {
            //取消之前调用动画帧请求
            cancelAnimationFrame(af);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(createLasers(numLasers));
        };
        window.onresize = init;
        init();


        
        // // This Code Doesn't Looks So Good Sorry For That 
        // // 😊

        // var canvas = document.querySelector('canvas');
        // var c = canvas.getContext('2d');

        // canvas.height = innerHeight;
        // canvas.width = innerWidth;

        // document.documentElement.style.overflow = 'hidden';


        // // Declarations --------------------
        // var mouse = {
        //     x: 0,
        //     y: 0
        // };
        // // Utilities ----------------------

        // function randomIntFromRange(min, max) {
        //     return Math.floor(Math.random() * (max - min + 1) + min);
        // }


        // // Bubbles -------------------------
        // // class Bubbles {
        // // 	constructor(x, y, radius) {
        // // 		this.x = x;
        // // 		this.y = y;
        // // 		this.radius = radius;
        // // 		this.color = {
        // // 			bg: 'rgba(255, 255, 255, 0.45)'
        // // 		};
        // // 		this.velocity = {
        // // 			x: (Math.random() - 0.5) * 0.5,
        // // 			y: Math.random() * 2
        // // 		};
        // // 		this.opacity = 1;
        // // 	}
        // // }
        // // Bubbles.prototype.draw = function () {
        // // 	c.beginPath();
        // // 	c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // // 	c.fillStyle = this.color.bg;
        // // 	c.fill();
        // // 	c.closePath();
        // // };
        // // Bubbles.prototype.update = function () {
        // // 	this.y -= this.velocity.y;
        // // 	this.draw();
        // // };


        // // Mini Bubbles ---------------

        // class miniBubbles {
        //     constructor(x, y, radius) {
        //         this.x = x;
        //         this.y = y;
        //         this.radius = radius;
        //         this.color = {
        //             bg: 'rgb(45, 140, 240)',
        //         };
        //         this.velocity = {
        //             x: (Math.random() - 0.5) * 0.6,
        //             y: (Math.random() - 1) * 0.5
        //         }
        //         this.gravity = -0.03;
        //         this.timeToLive = 500;
        //     }
        // }
        // miniBubbles.prototype.draw = function () {
        //     c.save();
        //     c.beginPath();
        //     c.arc(this.x, this.y, this.radius, 0, Math.PI * 8, false);
        //     c.fillStyle = this.color.bg;
        //     c.fill();
        //     c.closePath();
        //     c.restore();
        // }
        // miniBubbles.prototype.update = function () {
        //     if (this.y - this.radius < 0) {
        //         this.velocity.y = this.velocity.y;
        //     } else {
        //         this.velocity.y += this.gravity;
        //     }
        //     this.x += this.velocity.x;
        //     this.y += this.velocity.y;
        //     this.timeToLive -= 1;
        //     this.draw();
        // }

        // const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
        // backgroundGradient.addColorStop(0, 'rgba(255,255,255,0.6)')
        // backgroundGradient.addColorStop(1, 'rgba(255,255,255,0.6)')
        // // var bubbles = [];
        // var minibubbles = [];
        // var timer = 1;
        // var spawnRate = 150;

        // function init() {
        //     // bubbles = [];
        //     minibubbles = [];
        // }

        // function animate() {
        //     requestAnimationFrame(animate);
        //     //background linear gradient ------------
        //     c.fillStyle = backgroundGradient;
        //     c.fillRect(0, 0, canvas.width, canvas.height);

        //     // Render the Bubbles -------------------
        //     // bubbles.forEach((bubble, index) => {
        //     // 	bubble.update();
        //     // 	if (bubble.radius == 0) {
        //     // 		bubbles.splice(index, 1);
        //     // 	}
        //     // });
        //     minibubbles.forEach((minibubble, index) => {
        //         minibubble.update();
        //         if (minibubble.timeToLive == 0) {
        //             minibubbles.splice(index, 1);
        //         }
        //     });

        //     timer++;
        //     if (timer % spawnRate == 0) {
        //         const radius = randomIntFromRange(15, 60);
        //         const minradius = Math.random() * 2 + 1;
        //         // const radius = 15;
        //         const x = Math.max(radius, Math.random() * canvas.width - radius);
        //         const y = innerHeight + 100;
        //         // bubbles.push(new Bubbles(x, y, radius, 'white'));
        //         minibubbles.push(new miniBubbles(x, y, minradius));
        //         spawnRate = randomIntFromRange(10, 2);
        //     }


        //     //  When Hover over the bubbles ------------------
        //     // for (var i = 0; i < bubbles.length; i++) {
        //     // 	if (
        //     // 		mouse.x > bubbles[i].x - bubbles[i].radius &&
        //     // 		mouse.x < bubbles[i].x + bubbles[i].radius
        //     // 	) {
        //     // 		if (
        //     // 			mouse.y > bubbles[i].y - bubbles[i].radius &&
        //     // 			mouse.y < bubbles[i].y + bubbles[i].radius
        //     // 		) {
        //     // 			var x = bubbles[i].x;
        //     // 			var y = bubbles[i].y;
        //     // 			var radius = Math.random() * 2 + 1;
        //     // 			bubbles[i].radius -= bubbles[i].radius;
        //     // 			for (let a = 0; a < Math.random() * 4 + 4; a++) {
        //     // 				minibubbles.push(new miniBubbles(x, y, radius));
        //     // 			}
        //     // 		}
        //     // 	}
        //     // }
        // }


        // // Event Listener ---------------

        // // canvas.addEventListener('mousemove', mouseMove);

        // // function mouseMove(e) {
        // // 	mouse.x = e.offsetX;
        // // 	mouse.y = e.offsetY;
        // // }
        // addEventListener('resize', function () {
        //     canvas.height = innerHeight;
        //     canvas.width = innerWidth;
        //     init();
        // });

        // //  call ---------------
        // animate();
        // init();
    },
    methods: {
        
    }
}
</script>

<style lang="css" scoped>
    canvas {
        width: 1000px;
        height: 300px;
        overflow: hidden;
        content-zooming: none;
        padding:0;
        margin:0;
    }
</style>