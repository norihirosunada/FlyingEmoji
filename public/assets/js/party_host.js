const isFlipped = true; // 左右反転をさせるかどうかのフラグ、反転をさせる
let showHand = false
let keypointsHand = []; // 手のキーポイントを保持する配列
const videoElement = document.getElementsByClassName("input_video")[0];
videoElement.style.display = "none";

function onHandsResults(results) {
  keypointsHand = results.multiHandLandmarks;
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});

hands.setOptions({
  selfieMode: isFlipped, //　表示反転のオプション
  maxNumHands: 2, // 今回、簡単化のため検出数の最大1つまでに制限
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onHandsResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();
let videoImage;

class Emoji {
  constructor(text){
    this.size = 20;
    this.life = 500;
    // no WEBGL
    this.x = random(width);
    this.y = random(height*3/4, height);
    this.tmpX = this.x;
    this.tmpY = this.y;
    // WEBGL
    // this.x = random(-width/2, width/2);
    // this.y = random(height/4, height/2);
    this.w = random(20, 80);
    this.h = this.w;
    this.width = this.w;
    this.height = this.h;
    this.angle = 0;
    this.text = text;
  }
  draw(){

  }
  destroy(){
    this.life = 0;
  }
  isTouchedOrDestroy(){
    keypointsHand.forEach(hand => {
      hand.forEach(finger => {
        if(sq(finger.x*displayWidth - this.x) < 100 && sq(finger.y*displayHeight - this.y) < 100) {
          this.destroy()
          return
        }
      })
    });
  }
}

class Bouncy extends Emoji {
  constructor(text) {
    super(text)
    
    p5.tween.manager.addTween(this, 'tween1')
    .addMotions([
      { key: 'w', target: 1.2 * this.width },
      { key: 'h', target: 0.8 * this.height },
    ], 600, 'easeInQuad')
    .addMotions([
        { key: 'w', target: 0.86 * this.width },
        { key: 'h', target: 1.06 * this.height },
    ], 800, 'easeInQuad')
    .addMotions([
        { key: 'w', target: this.width },
        { key: 'h', target: this.height },
    ], 200, 'easeInQuad')
    .startLoop();
  }
  draw() {
    this.y -= deltaTime / 10;
    push();
    graphic.clear();
    graphic.text(this.text, 0, 0);
    image(graphic, this.x, this.y, this.w, this.h);
    pop();
    this.life--;
  }
}

class Circular extends Emoji {
  constructor(text) {
    super(text)
    
    p5.tween.manager.addTween(this, 'tween1')
    .addMotions([
      { key: 'angle', target: 360 },
    ], 2400, 'easeInOutElastic')
    .startLoop();
  }
  draw() {
    this.y -= deltaTime / 10;
    push();
    angleMode(DEGREES);
    translate(this.x, this.y);
    rotate(this.angle);
    graphic.clear();
    graphic.text(this.text, 0, 0);
    image(graphic, 0, 0, this.w, this.h);
    pop();
    this.life--;
  }
}

class WaveUp extends Emoji {
  constructor(text) {
    super(text)
    
    p5.tween.manager.addTween(this, 'tween1')
    .addMotions([
      { key: 'angle', target: 360 },
    ], 2400, 'linear')
    .startLoop();
  }
    draw() {
        this.tmpY -= deltaTime / 10;
        this.y = this.tmpY + sin(this.angle) * 20;
        push();
        // angleMode(DEGREES);
        // rotate(this.angle);
        translate(this.x, this.y);
        graphic.clear();
        graphic.text(this.text, 0, 0);
        image(graphic, 0, 0, this.w, this.h);
        pop();
        this.life--;
    }
}

class CircularUp extends Emoji {
  constructor(text) {
    super(text)
    
    p5.tween.manager.addTween(this, 'tween1')
    .addMotions([
      { key: 'angle', target: 360 },
    ], 2400, 'linear')
    .startLoop();
  }
    draw() {
        this.tmpY -= deltaTime / 10;
        this.y = this.tmpY + sin(this.angle) * 20;
        this.x = this.tmpX + cos(this.angle) * 20;
        push();
        // angleMode(DEGREES);
        // rotate(this.angle);
        translate(this.x, this.y);
        graphic.clear();
        graphic.text(this.text, 0, 0);
        image(graphic, 0, 0, this.w, this.h);
        pop();
        this.life--;
    }
}

// WEBGL only
class SideSpin extends Emoji {
  constructor(text) {
    super(text)
    
    p5.tween.manager.addTween(this, 'tween1')
    .addMotions([
      { key: 'angle', target: 360 * 2 },
    ], 2400, 'easeInOutCubic')
    .startLoop();
  }
    draw() {
        this.y -= deltaTime / 10;
        // this.y = this.tmpY + sin(this.angle) * 20;
        // this.x = this.tmpX + cos(this.angle) * 20;
        push();
        translate(this.x, this.y);
        angleMode(DEGREES);
        rotateY(this.angle);
        graphic.clear();
        graphic.text(this.text, 0, 0);
        image(graphic, 0, 0, this.w, this.h);
        pop();
        this.life--;
    }
}

class ScaleInOut extends Emoji {
  constructor(text) {
    super(text)
    
    this.scale = 0.8;
    
    p5.tween.manager.addTween(this, 'tween1')
    .addMotions([
      { key: 'scale', target: 1.2 },
    ], 600, 'easeInCubic')
    .addMotions([
      { key: 'scale', target: 0.8 },
    ], 600, 'easeOutCubic')
    .startLoop();
  }
    draw() {
        this.y -= deltaTime / 10;
        // this.y = this.tmpY + sin(this.angle) * 20;
        // this.x = this.tmpX + cos(this.angle) * 20;
        push();
        translate(this.x, this.y);
        // angleMode(DEGREES);
        // rotateY(this.angle);
        scale(this.scale);
        graphic.clear();
        graphic.text(this.text, 0, 0);
        image(graphic, 0, 0, this.w, this.h);
        pop();
        this.life--;
    }
}

let graphic;

let shared;
const maxLen = 200;
let insts = [];

let colorNum = 0;
let bgColor = "lightgray";
const colors = ["lightgray", "green", "blue"];
let blendIndex = 0;
let blendModes = ["BLEND", "ADD", "DARKEST", "LIGHTEST", "DIFFERENCE", "EXCLUSION", "MULTIPLY", "SCREEN", "REPLACE"];

let tutorialFlag = true;
let safeareaFlag = false;

function preload() {
  let params = getURLParams();
  partyConnect(
    // "wss://norihiro-p5p-server.herokuapp.com/",
    "wss://web-production-81f2a.up.railway.app",
    "like_button", 
    params.room ?? "main"
  );
  // shared = partyLoadShared("globals");
  
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    imageMode(CENTER);
    
    graphic = createGraphics(50, 50);
    graphic.translate(25, 25);
    graphic.textAlign(CENTER, CENTER);
    graphic.textSize(48);
  
    partySubscribe("addCircular", (emoji) => {
        insts.push(new Circular(emoji));
    });
    partySubscribe("addWaveUp", (emoji) => {
        insts.push(new WaveUp(emoji));
    });
    partySubscribe("addBouncy", (emoji) => {
        insts.push(new Bouncy(emoji));
    });
    partySubscribe("addCircularUp", (emoji) => {
        insts.push(new CircularUp(emoji));
    });
    partySubscribe("addScaleInOut", (emoji) => {
        insts.push(new ScaleInOut(emoji));
    });

  // params
  let params = getURLParams()
  tutorialFlag = params.tutorialFlag != "close"
  bgColor = params.background

  createCanvas(720, 500);
  videoImage = createGraphics(640, 360);
}

function draw() {
    background(bgColor);
    push();
    
    if(blendIndex == 0) {
        blendMode(BLEND);
    } else if(blendIndex == 1) {
        blendMode(ADD);
    } else if(blendIndex == 2) {
        blendMode(DARKEST);
    } else if(blendIndex == 3) {
        blendMode(LIGHTEST);
    } else if(blendIndex == 4) {
        blendMode(DIFFERENCE);
    } else if(blendIndex == 5) {
        blendMode(EXCLUSION);
    } else if(blendIndex == 6) {
        blendMode(MULTIPLY);
    } else if(blendIndex == 6) {
        blendMode(SCREEN);
    } else if(blendIndex == 6) {
        blendMode(REPLACE);
    } else {
        blendMode(BLEND);
    }
    
    noStroke();
    
    insts.forEach((instance, index) => {
        instance.draw()
        instance.isTouchedOrDestroy()
        if(instance.life < 0) {
            insts.splice(index, 1);
        }
    });
    if(insts.length > maxLen) {
        insts.shift();
    }
    
    pop();

    // 表示領域とビデオのアスペクト比が異なるようにしたので、表示サイズを補正
    displayWidth = width;
    displayHeight = (width * videoImage.height) / videoImage.width;
    if(showHand) {
      keypointsHand.forEach(hand => {
        push();
        noStroke();
        fill(200, 150, 255);
        hand.forEach(finger => {
          ellipse(finger.x * displayWidth, finger.y * displayHeight, 10);
        })
        pop();
      });
    }
    
    // 操作説明表示
    if (tutorialFlag) {
        push();
        translate(100, 100);
        textSize(28);
        text(`キー操作\n
クリックでランダムにリアクション表示\n
[0]:\t操作説明 開く/閉じる\n
[1]:\t背景色切り替え\n\t\t\t${colors.toLocaleString()}\n
[2]:\tブレンドモード切り替え\n\t\t\t${blendModes.toLocaleString()}\n\t\t\t → ${blendModes[blendIndex]}`, 0, 0 );
        pop();
    }
}

function mousePressed(e) {
    let num = random([0, 1, 2, 3, 4])
    if (num == 0) {
        insts.push(new WaveUp("❤️"))
    } else if (num == 1) {
        insts.push(new Circular("🍜"));
    } else if (num == 2) {
        insts.push(new Bouncy("🐙"));
    } else if (num == 3) {
        insts.push(new CircularUp("👍"));
    } else if (num == 4) {
        insts.push(new ScaleInOut("🔥"));
        // insts.push(new SideSpin("🔥"));
    }
}

function keyTyped() {
    if (key === '0') {
        tutorialFlag = !tutorialFlag;
    } else if (key === '1') {
        colorNum = ++colorNum % colors.length;
        bgColor = colors[colorNum];
    } else if (key === '2') {
        blendIndex = ++blendIndex % blendModes.length;
    } else if (key == '4') {
      showHand = !showHand
    }
    console.log(`Option Changed: tutorialFlag$=${tutorialFlag} color=${colors[colorNum]} blendMode=${blendIndex} showHand=${showHand}`)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}