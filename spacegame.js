class SpaceGame {
    constructor(appendsection = null) {
        console.log("Called SpaceGame");
        this.spacegamestyle = `
            #spacegame {
                width: 100%;
                height: 100%;
            }

            #gameInst {
                opacity: 0.05;
                transition: all 500ms ease-out;
                animation: gameblink 2s 5;

                &:hover {
                    opacity: 0.5;
                }

                #keylist {
                    display: flex;

                    .gamekey {
                        display: flex;
                        justify-content: left;
                        padding: 4px;
                        min-height: 40px;
                        min-width: 40px;
                        margin: 4px;
                        font-style: italic;
                        border-radius: 2px;
                        border: 1px solid #fff;
                    }
                }
            }

            @keyframes gameblink {
                from {
                    opacity: 0.01;
                }

                to {
                    opacity: 0.1;
                }
            }
        `;

        loadscss(this.spacegamestyle, "spaceGame");

        this.Star = class Star {
            constructor() {
                this.x = Math.random();
                this.y = Math.random();
                this.size = Math.random() * 0.1;
                this.maxSize = 3;
                this.z = Math.random();
                this.speed = 0.0005;
                this.speedX = this.speed * 4;
                this.speedY = this.speed * 4;
                this.speedZ = this.speed * 10;
                this.hue = 180 * Math.random();
                this.color = `aqua`;
                this.movex = 0;
                this.movey = 0;
                this.dynamics = [2, 2];
            }

            reset(dir = 1) {
                this.x = Math.random();
                this.y = Math.random();
                this.z = Math.random() * this.size;
                if (dir == -1) {
                    this.z = Math.random() * this.maxSize;
                    this.x = Math.random() * 2;
                    this.y = Math.random() * 2;
                }
            }

            update() {
                var dynamics = [2, 2]
                var speed = {
                    x: this.speedX,
                    y: this.speedY,
                    z: this.speedZ
                }
                // var dynamics=this.dynamics
                // this.hue += Math.random() * 5wwww
                if (this.hue >= 360) this.hue = Math.random();
    
                function front(speed, multiplier = 4) {
                    speed.x = speed.x * multiplier
                    speed.y = speed.y * multiplier
                    speed.z = speed.z * multiplier / 2
                    return speed
                }
    
    
                function back(speed, multiplier = -4) {
                    speed.x = speed.x * multiplier
                    speed.y = speed.y * multiplier
                    speed.z = speed.z * multiplier / 2
                    return speed
                }
    
    
                // console.log(dynamics)
    
                if (dynamics[0] == 1) {
    
                    speed = front(speed, 4)
                    if (dynamics[1] == 3) {
                        this.x -= speed.z / this.z
                        this.checkReset()
                    }
                    if (dynamics[1] == 1) {
                        this.x += speed.z / this.z
                        this.checkReset()
                    }
    
                }
                if (dynamics[0] == 3) {
                    speed = back(speed, -4)
                    if (this.z <= .1) {
                        this.reset(-1)
                    }
                    if (dynamics[1] == 3) {
                        this.x -= speed.z / this.z
                        this.checkReset()
                    }
                    if (dynamics[1] == 1) {
                        this.x += speed.z / this.z
                        this.checkReset()
                    }
                }
    
                if (dynamics[0] == 2) {
                    if (dynamics[1] == 3) {
                        this.x -= speed.z / this.z
                        this.checkReset()
                    }
                    if (dynamics[1] == 1) {
                        this.x += speed.z / this.z
                        this.checkReset()
                    }
                }
    
    
                var x = this.x - center.x
                var y = this.y - center.y
                var theta = Math.atan(y, x)
                this.movex = Math.cos(theta) * (speed.x * Math.abs(x)) * this.z
                this.movey = Math.sin(theta) * (speed.y) * this.z
                // this.y += movey
                this.z += speed.z * (this.x + this.y + this.z)
    
                if (this.x >= center.x) this.x += this.movex
                if (this.x < center.x) this.x -= this.movex
                if (this.y > center.y) this.y += this.movey// log(theta)
                if (this.y <= center.y) this.y += this.movey// log(theta)
                this.checkReset()
    
    
    
            }
    

            checkReset() {
                if (this.x < 0 || this.x > 1) this.reset()
                if (this.y < 0 || this.y > 1) this.reset()
    
                if (this.z < .04) this.reset(-1)
            }
    

            show() {
                this.update();
                draw.beginPath();
                draw.fillStyle = this.color;
                if (this.z <= 0) this.reset();
                draw.arc(
                    this.x * canvasOne.width,
                    this.y * canvasOne.height,
                    this.z,
                    0,
                    Math.PI * 2
                );
                draw.fill();
            }
        };

        this.spaceGameAnimate = () => {
            try {
                draw.clearRect(0, 0, canvasOne.width, canvasOne.height);
                for (let i = 0; i < this.StarArray.length; i++) {
                    this.StarArray[i].show();
                }

                requestAnimationFrame(this.spaceGameAnimate);
            } catch (error) {
                console.info("error Animating Spacegame");
                console.error(error);
                setTimeout(() => this.spaceGameAnimate(), 1000);
            }
        };

        this.init = () => {
            loadscss(this.spacegamestyle, "spaceGame");

            try {
                this.append(spacegame, "", "replace");
            } catch {}

            console.info("loading space game");

            document.addEventListener("keydown", this.updateDynamics);
            document.addEventListener("keyup", (e) => {
                this.pressedKeys.delete(e.key);
            });

            window.addEventListener("mousedown", this.checkClick);
            window.addEventListener("touchstart", this.checkClick);
            window.addEventListener("resize", this.resizeCanvas);

            var canvasOne = document.createElement("canvas");
            if (appendsection != null) var firstSection = appendsection;
            if (appendsection == null)
                var firstSection = document.querySelectorAll(
                    ".spacegame, .section"
                )[0];

            if (firstSection != undefined) {
                firstSection.style.minHeight = "100vh";
                var canvasOne = document.createElement("canvas");
                canvasOne.id = "spacegame";
                var spacegame = document.getElementById("spacegame");
                firstSection.append(canvasOne);

                var firstSectionZindex = firstSection.style.zIndex;
                firstSection.style.zIndex = firstSectionZindex + 1;
                spacegame.style.zIndex = firstSectionZindex - 2;

                spacegame.style.position = "absolute";
                spacegame.style.top = 0;
                spacegame.style.left = 0;
                spacegame.style.height = firstSection.style.height;
                firstSection.style.minHeight = "100vh";
                this.resizeCanvas();

                var draw = spacegame.getContext("2d");
                draw.font = "30px Verdana";
                draw.fillText("mGeek.in", 40, 100);

                var center = { x: 0.6, y: 0.5 };
                var pressedKeys = new Set();
                this.StarArray = [];

                for (let i = 0; i < 150; i++) {
                    var cc = new this.Star();
                    this.StarArray[i] = cc;
                }

                this.spaceGameAnimate();

                console.info("spaceGame loaded");
            }
        };

        this.resizeCanvas = () => {
            try {
                var canvasOne = document.getElementById("spacegame");
                canvasOne.width = window.innerWidth;
                canvasOne.height = Math.max(
                    window.innerHeight,
                    firstSection.offsetHeight
                );
                canvasOne.style.background =
                    "hsla(0, 40%, calc(30% * var(--lightFactor,1)), .1)";
            } catch (e) {
                console.error(e);
            }
        };

        this.showGameKeys = () => {
            spacegame.parentNode.append(gen(div, "gameInst", ""));
            gameInst.append(
                gen(h3, "", "And while you are here roam around by pressing"),
                gen(div, "keylist")
            );
            keylist.append(
                gen(kbd, "", "w", "gamekey"),
                gen(kbd, "", "s", "gamekey"),
                gen(kbd, "", "a", "gamekey"),
                gen(kbd, "", "d", "gamekey")
            );
            gameInst.style.position = "absolute";
            gameInst.style.top = "70vh";
            gameInst.style.right = "5em";

            gameInst.style.zIndex = firstSectionZindex - 3;
        };

        this.updateDynamics = (e) => {
            console.log("updateDynamics");
            this.pressedKeys.add(e.key);
            var dynamics = [2, 2];
            var testFront = "w,W,ArrowUp".split(",");
            if (testFront.some((k) => this.pressedKeys.has(k))) {
                console.log("Front");
                dynamics[1] = 1;
            }
            var testBack = "s,S,ArrowDown".split(",");
            if (testBack.some((k) => this.pressedKeys.has(k))) {
                console.log("Back");
                dynamics[1] = 3;
            }
            var testLeft = "a,A,ArrowLeft".split(",");
            if (testLeft.some((k) => this.pressedKeys.has(k))) {
                console.log("Left");
                dynamics[0] = 1;
            }
            var testRight = "d,D,ArrowRight".split(",");
            if (testRight.some((k) => this.pressedKeys.has(k))) {
                console.log("Right");
                dynamics[0] = 3;
            }
            console.log(dynamics);
            return dynamics;
        };

        this.checkClick = (e) => {
            // console.log(e)
            console.log("checkClick");

            var SpaceGame = grab("#spacegame")[0];
            var box = SpaceGame.getBoundingClientRect();

            var sg = {
                xrange: [box.left, box.right],
                yrange: [box.top, box.bottom],
            };

            var click = {
                X: e.clientX,
                Y: e.clientY,
            };

            if (
                click.X >= sg.xrange[0] &&
                click.X <= sg.xrange[1] &&
                click.Y >= sg.yrange[0] &&
                click.Y <= sg.yrange[1]
            ) {
                xCase = Math.ceil(
                    ((click.X - sg.xrange[0]) * 3) / (sg.xrange[1] - sg.xrange[0])
                );
                yCase = Math.ceil(
                    ((click.Y - sg.yrange[0]) * 3) / (sg.yrange[1] - sg.yrange[0])
                );

                this.dynamics = [xCase, yCase];
                //   console.log(this.dynamics)//use this to move according
            }
            console.log(this.dynamics);
            return this.dynamics;
        };

    }
}

// var sg = new SpaceGame();
// sg