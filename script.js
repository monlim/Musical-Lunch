//Reset audio context
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const static = new Tone.Player("https://monlim.github.io/Musical-Lunch/Audio/Static.wav", {volume: -12});
const limiter = new Tone.Limiter(-0.03);
const mouthGain = new Tone.Gain().connect(limiter);
const handGain = new Tone.Gain().connect(limiter);
const reverb = new Tone.Reverb(3);
const dist = new Tone.Distortion(0.8);
const pingPong = new Tone.PingPongDelay(0.2, 0.5).connect(mouthGain);
const piano = new Tone.Sampler({
  urls: {
    "C4": "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    "A4": "A4.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).connect(handGain);
const grace = new Tone.Player("https://monlim.github.io/Musical-Lunch/Audio/Grace.mp3");
static.chain(dist, reverb, mouthGain);
limiter.toDestination();
grace.connect(pingPong);
grace.loop = true;
grace.volume.value = -60;
grace.autostart = true;

const dragonScales = {0: {0: "A0", 1: "D1", 2: "F1", 3: "A1", 4: "D2", 5: "F2", 6: "A2", 7: "D3", 8: "F3", 9: "A3", 10: "D4",
11: "F4", 12: "A4", 13: "D5", 14: "F5", 15: "A5", 16: "D6", 17: "F6", 18: "A6", 19: "D7", 20: "F7", 21: "A7"}, 
1: {0: "A#0", 1: "D1", 2: "F1", 3: "A#1", 4: "D2", 5: "F2", 6: "A#2", 7: "D3", 8: "F3", 9: "A#3", 10: "D4",
11: "F4", 12: "A#4", 13: "D5", 14: "F5", 15: "A#5", 16: "D6", 17: "F6", 18: "A#6", 19: "D7", 20: "F7", 21: "A#7"}, 
2: {0: "A0", 1: "D1", 2: "E1", 3: "A1", 4: "D2", 5: "E2", 6: "A2", 7: "D3", 8: "E3", 9: "A3", 10: "D4",
11: "E4", 12: "A4", 13: "D5", 14: "E5", 15: "A5", 16: "D6", 17: "E6", 18: "A6", 19: "D7", 20: "E7", 21: "A7"},
3: {0: "A0", 1: "C#1", 2: "E1", 3: "A1", 4: "C#2", 5: "E2", 6: "A2", 7: "C#3", 8: "E3", 9: "A3", 10: "C#4",
11: "E4", 12: "A4", 13: "C#5", 14: "E5", 15: "A5", 16: "C#6", 17: "E6", 18: "A6", 19: "C#7", 20: "E7", 21: "A7"}};

/*const tigerScales = {0: {0: ["A0", "A1", "A#2", "A#3"], 1: ["C1", "C#2", "C3", "B3"], 2: ["A1", "F#2", "D3", "B3"], 
3: ["C2", "G#2", "E3", "C4"], 4: ["E2", "B2", "F3", "C4"], 5: ["A#2", "D#3", "G#3", "C#4"], 6: ["C#3", "F3", "A3", "C#4"], 
7: ["E3", "G3", "A#3", "C#4"], 8: ["G3", "A3", "C4", "D4"], 9: ["A#3", "C4", "C#4", "D#4"], 10: ["C#4", "D4", "D#4", "E4"], 
11: ["D#4", "F4", "F#4", "G#4"], 12: ["D#4", "F#4", "A4", "C5"], 13: ["E4", "G#4", "B4", "D#5"], 14: ["E4", "A4", "C#5", "F#5"], 
15: ["E4", "A#4", "E5", "A#5"], 16: ["F4", "C5", "G5", "D6"], 17: ["F4", "C#5", "A5", "F6"], 18: ["F4", "E6", "C#6", "A#6"], 
19: ["F#4", "F5", "F6", "E7"], 20: ["G4", "G5", "G#6", "G#7"], 21: ["G4", "A5", "A#6", "C8"]},

1: {0: ["A0", "A1", "A#2", "A#3"], 1: ["C1", "C#2", "C3", "B3"], 2: ["A1", "F#2", "D3", "B3"], 
3: ["C2", "G#2", "E3", "C4"], 4: ["E2", "B2", "F3", "C4"], 5: ["A#2", "D#3", "G#3", "C#4"], 6: ["C#3", "F3", "A3", "C#4"], 
7: ["E3", "G3", "A#3", "C#4"], 8: ["G3", "A3", "C4", "D4"], 9: ["A#3", "C4", "C#4", "D#4"], 10: ["C#4", "D4", "D#4", "E4"], 
11: ["D#4", "F4", "F#4", "G#4"], 12: ["D#4", "F#4", "A4", "C5"], 13: ["E4", "G#4", "B4", "D#5"], 14: ["E4", "A4", "C#5", "F#5"], 
15: ["E4", "A#4", "E5", "A#5"], 16: ["F4", "C5", "G5", "D6"], 17: ["F4", "C#5", "A5", "F6"], 18: ["F4", "E6", "C#6", "A#6"], 
19: ["F#4", "F5", "F6", "E7"], 20: ["G4", "G5", "G#6", "G#7"], 21: ["G4", "A5", "A#6", "C8"]},

2: {0: ["A0", "A1", "A#2", "A#3"], 1: ["C1", "C#2", "C3", "B3"], 2: ["A1", "F#2", "D3", "B3"], 
3: ["C2", "G#2", "E3", "C4"], 4: ["E2", "B2", "F3", "C4"], 5: ["A#2", "D#3", "G#3", "C#4"], 6: ["C#3", "F3", "A3", "C#4"], 
7: ["E3", "G3", "A#3", "C#4"], 8: ["G3", "A3", "C4", "D4"], 9: ["A#3", "C4", "C#4", "D#4"], 10: ["C#4", "D4", "D#4", "E4"], 
11: ["D#4", "F4", "F#4", "G#4"], 12: ["D#4", "F#4", "A4", "C5"], 13: ["E4", "G#4", "B4", "D#5"], 14: ["E4", "A4", "C#5", "F#5"], 
15: ["E4", "A#4", "E5", "A#5"], 16: ["F4", "C5", "G5", "D6"], 17: ["F4", "C#5", "A5", "F6"], 18: ["F4", "E6", "C#6", "A#6"], 
19: ["F#4", "F5", "F6", "E7"], 20: ["G4", "G5", "G#6", "G#7"], 21: ["G4", "A5", "A#6", "C8"]},

3: {0: ["A0", "A1", "A#2", "A#3"], 1: ["C1", "C#2", "C3", "B3"], 2: ["A1", "F#2", "D3", "B3"], 
3: ["C2", "G#2", "E3", "C4"], 4: ["E2", "B2", "F3", "C4"], 5: ["A#2", "D#3", "G#3", "C#4"], 6: ["C#3", "F3", "A3", "C#4"], 
7: ["E3", "G3", "A#3", "C#4"], 8: ["G3", "A3", "C4", "D4"], 9: ["A#3", "C4", "C#4", "D#4"], 10: ["C#4", "D4", "D#4", "E4"], 
11: ["D#4", "F4", "F#4", "G#4"], 12: ["D#4", "F#4", "A4", "C5"], 13: ["E4", "G#4", "B4", "D#5"], 14: ["E4", "A4", "C#5", "F#5"], 
15: ["E4", "A#4", "E5", "A#5"], 16: ["F4", "C5", "G5", "D6"], 17: ["F4", "C#5", "A5", "F6"], 18: ["F4", "E6", "C#6", "A#6"], 
19: ["F#4", "F5", "F6", "E7"], 20: ["G4", "G5", "G#6", "G#7"], 21: ["G4", "A5", "A#6", "C8"]},

};*/

let scaleIndex=0, noteIndexLeft=0.5, noteIndexRight=0.5, pianoVelLeft=0.5, pianoVelRight=0.5, mouthLine=3;

//create midi note loop
const leftLoop = new Tone.Loop((time) => {
  piano.triggerAttackRelease(dragonScales[scaleIndex][noteIndexLeft], 1, time, pianoVelLeft);
}, "16n");

//create midi note loop
const rightLoop = new Tone.Loop((time) => {
  piano.triggerAttackRelease(dragonScales[scaleIndex][noteIndexRight], 1, time, pianoVelRight);
}, "16n");

/*create midi note loop
const leftTigerLoop = new Tone.Loop((time) => {
  piano.triggerAttackRelease(tigerScales[scaleIndex][noteIndexLeft], 0.25, time, pianoVelLeft);
}, "16n");

//create midi note loop
const rightTigerLoop = new Tone.Loop((time) => {
  piano.triggerAttackRelease(tigerScales[scaleIndex][noteIndexRight], 0.25, time, pianoVelRight);
}, "16n");*/

//linear scaling function
function scaleValue(value, from, to) {
  let scale = (to[1] - to[0]) / (from[1] - from[0]);
  let capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return (capped * scale + to[0]);
};

//exponential scale
let powerScale = d3.scalePow()
  .exponent(2).domain([0, 3]).range([-72, 0]).clamp(true);

Tone.Transport.bpm.value = 140;
let updateBpm = (value) => {
  Tone.Transport.bpm.value = value;
};

//function to calculate velocity and set patternDirection
let xNowLeft = 0.4, yNowLeft = 0, stillLeft=0, stillRight=0;// default values to start off distance calculation;
function leftVelocityCounter(leftIndexX, leftIndexY){
  xVelocityLeft = (leftIndexX - xNowLeft)/0.1;
  yVelocityLeft = (leftIndexY - yNowLeft)/0.1;
  stillLeft = (Math.sqrt((leftIndexX - xNowLeft)**2 + (leftIndexY - yNowLeft)**2))/0.1;
  xNowLeft = leftIndexX;
  yNowLeft = leftIndexY;
  if (stillLeft > 0.15) {
    leftLoop.start()
  } else {
    leftLoop.stop()
  };
  pianoVelLeft = scaleValue(stillLeft, [0.15, 2], [0.2, 1]); //map LH velocity to LH stillness 
};

let xNowRight = 0.6, yNowRight = 0; // default values to start off distance calculation;
function rightVelocityCounter(rightIndexX, rightIndexY){
  xVelocityRight = (rightIndexX - xNowRight)/0.1;
  yVelocityRight = (rightIndexY - yNowRight)/0.1;
  stillRight = (Math.sqrt((rightIndexX - xNowRight)**2 + (rightIndexY - yNowRight)**2))/0.1;
  xNowRight = rightIndexX;
  yNowRight = rightIndexY;
  if (stillRight > 0.15) {
    rightLoop.start()
  } else {
    rightLoop.stop()
  };
  pianoVelRight = scaleValue(stillRight, [0.15, 2], [0.2, 1]); //map RH velocity to RH stillness
};

//cycle between 4 scales for each zodiac
function changeScale(){
  if (scaleIndex < 3){scaleIndex = scaleIndex + 1}
    else {scaleIndex = 0};
};

//Trigger note if left hand reversed
let t2on = false;
let t2DistanceActivate = -0.15;
let t2DistanceDeactivate = 0;
function Trigger2(leftThumbX, leftPinkyX) {
    if ((leftThumbX - leftPinkyX) <= t2DistanceActivate){
      if(t2on)return;
      changeScale();
      t2on = true;
    };
    if((leftThumbX - leftPinkyX) > t2DistanceDeactivate){
      t2on = false;
    };
};

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  //canvasCtx.drawImage(results.segmentationMask, 0, 0,
  //                    canvasElement.width, canvasElement.height);

  // Only overwrite existing pixels.
  canvasCtx.globalCompositeOperation = 'source-in';
  canvasCtx.fillStyle = '#00FF00';
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  //drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
  //               {color: '#00FF00', lineWidth: 4});
  //drawLandmarks(canvasCtx, results.poseLandmarks,
  //              {color: '#FF0000', lineWidth: 2});
  drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LIPS, 
                {color: '#FF0000', lineWidth: mouthLine});
  //drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
  //               {color: '#C0C0C070', lineWidth: 1});
  drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                 {color: '#FF0000', lineWidth: 3});
  drawLandmarks(canvasCtx, results.leftHandLandmarks,
                {color: '#FF0000', lineWidth: 2});
  drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                 {color: '#FF0000', lineWidth: 3});
  drawLandmarks(canvasCtx, results.rightHandLandmarks,
                {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
  Tone.Transport.start();
  if(results.faceLandmarks){
    topLip = results.faceLandmarks[13];
    bottomLip = results.faceLandmarks[14];
    verticalMouth = (bottomLip.y - topLip.y)*100;
    mouthLine = scaleValue(verticalMouth, [0, 12], [2, 25]);
    pingPong.wet.value = dist.wet.value = scaleValue(verticalMouth, [0, 12], [0, 1]);
    grace.volume.value = powerScale(verticalMouth);
    static.playbackRate = scaleValue(verticalMouth, [0, 12], [0.2, 2]);
    static.volume.value = scaleValue(verticalMouth, [0, 12], [-12, 0]);
    reverb.wet.value = scaleValue(verticalMouth, [0, 12], [1, 0]);
    if (verticalMouth > 1){
      static.start();
    } else {
      static.stop();
    }
  };
  if(results.rightHandLandmarks){
    leftIndex = results.rightHandLandmarks[8];
    leftThumb = results.rightHandLandmarks[4];
    leftPinky = results.rightHandLandmarks[20];
    noteIndexLeft = Math.floor(scaleValue(leftIndex.x, [0, 1], [0, 22]));
    setInterval(leftVelocityCounter(leftIndex.x, leftIndex.y), 100);
  } else {
    leftLoop.stop();
    //leftTigerLoop.stop();
  }
  if(results.leftHandLandmarks){
    rightIndex = results.leftHandLandmarks[8];
    rightThumb = results.leftHandLandmarks[4];
    rightPinky = results.leftHandLandmarks[20];
    noteIndexRight = Math.floor(scaleValue(rightIndex.x, [0, 1], [0, 22]));
    setInterval(rightVelocityCounter(rightIndex.x, rightIndex.y), 100);
    if (rightThumb && rightPinky){Trigger2(rightThumb.x, rightPinky.x)};
  } else {
    rightLoop.stop();
    //rightTigerLoop.stop();
  }
};

const holistic = new Holistic({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
}});
holistic.setOptions({
  selfieMode: true,
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
holistic.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await holistic.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();

