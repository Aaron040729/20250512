let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const pointsArray1 = [133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155];
const pointsArray2 = [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 初始化 facemesh
  facemesh = ml5.facemesh(video, modelReady);

  // 設置事件監聽器
  facemesh.on('predict', (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 繪製 points 陣列的多邊形
    stroke(255, 0, 0); // 紅色線條
    strokeWeight(5); // 線條粗細為5
    noFill();

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const [x, y] = keypoints[points[i]];
      vertex(x, y);
    }
    endShape(CLOSE); // 將最後一點與第一點連接

    // 繪製 pointsArray1 的連接線
    stroke(0, 255, 0); // 綠色線條
    for (let i = 0; i < pointsArray1.length - 1; i++) {
      const [x1, y1] = keypoints[pointsArray1[i]];
      const [x2, y2] = keypoints[pointsArray1[i + 1]];
      line(x1, y1, x2, y2);
    }

    // 繪製 pointsArray2 的連接線
    stroke(0, 0, 255); // 藍色線條
    for (let i = 0; i < pointsArray2.length - 1; i++) {
      const [x1, y1] = keypoints[pointsArray2[i]];
      const [x2, y2] = keypoints[pointsArray2[i + 1]];
      line(x1, y1, x2, y2);
    }
  }
}
