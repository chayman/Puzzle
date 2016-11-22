var serial;
var portName = '/dev/cu.wchusbserial1420';
var options = {
  baudrate: 9600
};
var locH;
var locV;
var circleColor = 255;
var inString;
var img1;
var img1x = 100;
var img1y = 100;
var img1w = 100;
var img1h = 100;
var img2;
var img2x = 300;
var img2y = 200;
var img2w = 100;
var img2h = 100;
var img3;
var img3x = 200;
var img3y = 400;
var img3w = 100;
var img3h = 100;
var img4;
var img4x = 400;
var img4y = 300;
var img4w = 100;
var img4h = 100;
var r1;
var r1x = 150;
var r1y = 150;
var r1w = 100;
var r1h = 100;
var r1s;
var r2;
var r2x = 250;
var r2y = 150;
var r2w = 100;
var r2h = 100;
var r2s;
var r3;
var r3x = 150;
var r3y = 250;
var r3w = 100;
var r3h = 100;
var r3s;
var r4;
var r4x = 250;
var r4y = 250;
var r4w = 100;
var r4h = 100;
var r4s;
var sensors = [];

function setup() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.list(); // list the serial ports
  serial.open(portName, options); // open a serial port

  createCanvas(500, 500);

}

function draw() {
  background(200, 230, 255);
  fill(255);

  noStroke();
  fill(circleColor); // fill depends on the button
  ellipse(locH, locV, 20, 20); // draw the circle

  imageMode(CENTER);
  image(img1, img1x, img1y, img1w, img1h);
  image(img2, img2x, img2y, img2w, img2h);
  image(img3, img3x, img3y, img3w, img3h);
  image(img4, img4x, img4y, img4w, img4h);

  text("sensor value: " + inString, 30, 30);

  noFill();
  rectMode(CENTER);
  r1s = stroke(0);
  r1 = rect(r1x, r1y, r1w, r1h);
  r2s = stroke(0);
  r2 = rect(r2x, r2y, r2w, r2h);
  r3s = stroke(0);
  r3 = rect(r3x, r3y, r3w, r3h);
  r4s = stroke(0);
  r4 = rect(r4x, r4y, r4w, r4h);
  fill(200, 255, 230);

  noFill();


  movePiece1();
  movePiece2();
  movePiece3();
  movePiece4();

  LockPiece1();
  LockPiece2();
  LockPiece3();
  LockPiece4();

  winner();

}





function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2) { // if there are three elements
      locH = map(sensors[0], 0, 1023, 0, 500); // element 0 is the locH
      locV = map(sensors[1], 0, 1023, 0, 500); // element 1 is the locV
      circleColor = 255 - (sensors[2] * 255); // element 2 is the button

    }
  }
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

function preload() {
  img1 = loadImage("assets/topleft.jpg");
  img2 = loadImage("assets/topright.jpg");
  img3 = loadImage("assets/bottomleft.jpg");
  img4 = loadImage("assets/bottomright.jpg");
}


function movePiece1() {
  if (sensors[2] == 0) {
    if (dist(img1x, img1y, locH, locV) < 50) {

      img1x = locH;
      img1y = locV;

    }

  }
}

function movePiece2() {
  if (sensors[2] == 0) {
    if (dist(img2x, img2y, locH, locV) < 50) {

      img2x = locH;
      img2y = locV;


    }
  }
}

function movePiece3() {
  if (sensors[2] == 0) {
    if (dist(img3x, img3y, locH, locV) < 50) {

      img3x = locH;
      img3y = locV;
    }
  }
}

function movePiece4() {
  if (sensors[2] == 0) {
    if (dist(img4x, img4y, locH, locV) < 50) {

      img4x = locH;
      img4y = locV;
    }
  }
}

function LockPiece1() {
  if (dist(img1x, img1y, r1x, r1y) < 25) {
    r1s = stroke(255);
    rect(150, 150, 100, 100);
    img1x = 150;
    img1y = 150;
  }

}

function LockPiece2() {
  if (dist(img2x, img2y, r2x, r2y) < 25) {
    r2s = stroke(255);
    rect(250, 150, 100, 100);
    img2x = 250;
    img2y = 150;
  }

}

function LockPiece3() {
  if (dist(img3x, img3y, r3x, r3y) < 25) {
    r3s = stroke(255);
    rect(150, 250, 100, 100);
    img3x = 150;
    img3y = 250;
  }

}

function LockPiece4() {
  if (dist(img4x, img4y, r4x, r4y) < 25) {
    r4s = stroke(255);
    rect(250, 250, 100, 100);
    img4x = 250;
    img4y = 250;
  }

}

function winner() {
  if (img1x == 150 && img2x == 250 && img3x == 150 && img4x == 250) {
    fill(0);
    text("yay you did it!", 100, 80);
  }
}