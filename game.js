var frequencyByNote = {
  "C0":	16.35,
  "C#0/Db0": 17.32,
  "D0":	18.35,
  "D#0/Eb0": 19.45,
  "E0":	20.60,
  "F0":	21.83,
  "F#0/Gb0": 23.12,
  "G0":	24.50,
  "G#0/Ab0": 25.96,
  "A0":	27.50,
  "A#0/Bb0": 29.14,
  "B0":	30.87,
  "C1":	32.70,
  "C#1/Db1": 34.65,
  "D1":	36.71,
  "D#1/Eb1": 38.89,
  "E1":	41.20,
  "F1":	43.65,
  "F#1/Gb1": 46.25,
  "G1":	49.00,
  "G#1/Ab1": 51.91,
  "A1":	55.00,
  "A#1/Bb1": 58.27,
  "B1":	61.74,
  "C2":	65.41,
  "C#2/Db2": 69.30,
  "D2":	73.42,
  "D#2/Eb2": 77.78,
  "E2":	82.41,
  "F2":	87.31,
  "F#2/Gb2": 92.50,
  "G2":	98.00,
  "G#2/Ab2": 103.83,
  "A2":	110.00,
  "A#2/Bb2": 116.54,
  "B2":	123.47,
  "C3":	130.81,
  "C#3/Db3": 138.59,
  "D3":	146.83,
  "D#3/Eb3": 155.56,
  "E3":	164.81,
  "F3":	174.61,
  "F#3/Gb3": 185.00,
  "G3":	196.00,
  "G#3/Ab3": 207.65,
  "A3":	220.00,
  "A#3/Bb3": 233.08,
  "B3":	246.94,
  "C4":	261.63,
  "C#4/Db4": 277.18,
  "D4":	293.66,
  "D#4/Eb4": 311.13,
  "E4":	329.63,
  "F4":	349.23,
  "F#4/Gb4": 369.99,
  "G4":	392.00,
  "G#4/Ab4": 415.30,
  "A4":	440.00,
  "A#4/Bb4": 466.16,
  "B4":	493.88,
  "C5":	523.25,
  "C#5/Db5": 554.37,
  "D5":	587.33,
  "D#5/Eb5": 622.25,
  "E5":	659.25,
  "F5":	698.46,
  "F#5/Gb5": 739.99,
  "G5":	783.99,
  "G#5/Ab5": 830.61,
  "A5":	880.00,
  "A#5/Bb5": 932.33,
  "B5":	987.77,
  "C6":	1046.50,
  "C#6/Db6": 1108.73,
  "D6":	1174.66,
  "D#6/Eb6": 1244.51,
  "E6":	1318.51,
  "F6":	1396.91,
  "F#6/Gb6": 1479.98,
  "G6":	1567.98,
  "G#6/Ab6": 1661.22,
  "A6":	1760.00,
  "A#6/Bb6": 1864.66,
  "B6":	1975.53,
  "C7":	2093.00,
  "C#7/Db7": 2217.46,
  "D7":	2349.32,
  "D#7/Eb7": 2489.02,
  "E7":	2637.02,
  "F7":	2793.83,
  "F#7/Gb7": 2959.96,
  "G7":	3135.96,
  "G#7/Ab7": 3322.44,
  "A7":	3520.00,
  "A#7/Bb7": 3729.31,
  "B7":	3951.07,
  "C8":	4186.01,
  "C#8/Db8": 4434.92,
  "D8":	4698.63,
  "D#8/Eb8": 4978.03,
  "E8":	5274.04,
  "F8":	5587.65,
  "F#8/Gb8": 5919.91,
  "G8":	6271.93,
  "G#8/Ab8": 6644.88,
  "A8":	7040.00,
  "A#8/Bb8": 7458.62,
  "B8":	7902.13,
};

var music = {
  amplitude: 0.0
};

//
//
////////////////////////////////////////////////////////////////////////////////
// p5.js code
////////////////////////////////////////////////////////////////////////////////
var osc, fft;

var NOTE_LABEL_WIDTH = 40;
var CANVAS_HEIGHT = 256;
var PADDING = 25;
var CANVAS_WIDTH = 2 * PADDING + NOTE_LABEL_WIDTH * _.keys(frequencyByNote).length;

var notes = _.filter(_.keys(frequencyByNote), (note) => {
  return note.match(/[CGDAE]\d/i);
});
var totalNumberOfNotes = notes.length;
var currentNoteIndex = notes.indexOf('A4');

function currentNote() {
  return notes[ currentNoteIndex % totalNumberOfNotes ];
}

function currentFrequency() {
  return frequencyByNote[currentNote()];
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(music.amplitude);

  fft = new p5.FFT();
  osc.start();
}

function draw() {
  background(255);

  rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  var index = 0;
  textFont('Hack', 13);
  _.each(notes, (note) => {
    text("(" + note.split("/")[0] + ")", PADDING + index * NOTE_LABEL_WIDTH, PADDING, NOTE_LABEL_WIDTH, 25);
    index += 1;
  });

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  // change oscillator frequency based on mouseX
  // var freq = map(mouseX, 0, width, 40, 880);
  // var freq = frequencyByNote['A4'];
  var freq = currentFrequency();
  // console.log(freq);
  osc.freq(freq);

  // var amp = map(mouseY, 0, height, 1, .01);
  osc.amp(music.amplitude);

  text("Amplitude: " + music.amplitude, PADDING, 2 * PADDING, 500, 100); // Text wraps within text box
  text("Note: " + currentNote(), PADDING, 3 * PADDING, 500, 100); // Text wraps within text box
  text("Frequency: " + freq, PADDING, 4 * PADDING, 500, 100); // Text wraps within text box
}

////////////////////////////////////////////////////////////////////////////////
// Gamepad
////////////////////////////////////////////////////////////////////////////////
const gamepad = new Gamepad();

gamepad.on('connect', e => {
  console.log(`controller ${e.index} connected!`);
});

gamepad.on('disconnect', e => {
  console.log(`controller ${e.index} disconnected!`);
});

gamepad.on('press', 'button_1', () => {
  console.log('button 1 was pressed!');
});

gamepad.on('press', 'button_2', () => {
  console.log('button 2 was pressed!');
  currentNoteIndex += 1;
});

gamepad.on('press', 'button_3', () => {
  console.log('button 3 was pressed!');
  currentNoteIndex -= 1;
});

gamepad.on('hold', 'button_1', () => {
  console.log('button 1 is being held!');
});

gamepad.on('release', 'shoulder_bottom_right', () => {
  // console.log('button 1 was released!');
  music.amplitude = 0;
});

gamepad.on('hold', 'shoulder_bottom_right', e => {
  // console.log(`shoulder_bottom_right has a value of ${e.value}!`);
  music.amplitude = e.value;
});
