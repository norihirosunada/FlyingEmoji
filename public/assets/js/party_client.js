const myShape = {
  w: 200,
  h: 200
}

let tween;

function preload() {
    let params = getURLParams();
    partyConnect(
        // "wss://norihiro-p5p-server.herokuapp.com/",
        "wss://web-production-81f2a.up.railway.app/",
        "like_button", 
        params.room ?? "main"
    );
    // shared = partyLoadShared("globals");
}

function setup() {
    noCanvas();
//   createCanvas(400, 400);
//   imageMode(CENTER);
//   translate(width/2, height/2);
  
//   bouncy = createGraphics(200, 200);
//   bouncy.translate(100, 100);
//   bouncy.textAlign(CENTER, CENTER);
//   bouncy.textSize(180);
//   // bouncy.background(255);
//   // bouncy.rect(0, 0, 100, 100);
//   bouncy.text("🍜", 0, 0);
  
//   tween = p5.tween.manager.addTween(myShape, 'tween1')
//     .addMotions([
//       { key: 'w', target: 1.2 * bouncy.width },
//       { key: 'h', target: 0.8 * bouncy.height },
//     ], 600, 'easeInQuad')
//     .addMotions([
//         { key: 'w', target: 0.86 * bouncy.width },
//         { key: 'h', target: 1.06 * bouncy.height },
//     ], 800, 'easeInQuad')
//     .addMotions([
//         { key: 'w', target: bouncy.width },
//         { key: 'h', target: bouncy.height },
//     ], 200, 'easeInQuad');
    
    
    // select("#ramen").mousePressed( _ => {
    //   partyEmit("addCircular", "🍜");
    // });
    // select("#ramen").touchStarted( _ => {
    //   partyEmit("addCircular", "🍜");
    // });
    // select("#heart").mousePressed( _ => {
    //     partyEmit("addWaveUp", "❤️");
    // });
    // select("#tako").mousePressed( _ => {
    //     partyEmit("addBouncy", "🐙");
    // });
    // select("#good").mousePressed( _ => {
    //     partyEmit("addCircularUp", "👍");
    // });
    
    selectAll("button").forEach( button => {
        if(button.attribute("data-type") == "emoji") {
            button.touchStarted( _ => {
              partyEmit(button.attribute("data-func"), button.attribute("data-emoji"));
            });
        }
    });
    
    
}

function draw() {
//   background(220);
//   noStroke();
//   translate(width/2, height/2);
//   image(bouncy, 0, 0, myShape.w, myShape.h);
}

function mousePressed(e) {
//   partyEmit("heartOnPressed");
  
//   if(!tween.active) {
//     tween.startTween();
//   } else {
//     tween.restart();
//   }
  
}

