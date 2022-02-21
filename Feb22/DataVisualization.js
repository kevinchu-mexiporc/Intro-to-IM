````
/*
 * process a data visualization
 * about earthquakes happening in Greece
 * the CSV file data includes 
 * the Lat, the Long, the depth, and the magnitude of each earthquake
 * Source: https://www.kaggle.com/datasets
 */

// An array of strings to hold the entire CSV file
let strings = [];

// For scaling the locations of each earthquake into the canvas, we catch the minimum and maximum latitude and longitude
let minLat;
let maxLat;
let minLong;
let maxLong;

function preload() {
  // The text from the file is loaded into an array.
  strings = loadStrings("Earthquakes.csv");
}

function setup() {
  createCanvas(500, 500);
  background(255);

  // Did we succeed to load anything?
  if (strings == null) {
    print("failed to load the file, stopping here");

    while (true) {}
  }

  print(
    "strings loaded from file successfully, read " + strings.length + " lines"
  );

  // Find the minimum and maximum latitude
  // and longitude
  findMinMaxLatLong();
}

function findMinMaxLatLong() {
  let singleRow = [];

  // loop over each row in the file
  for (let csvRowNumber = 0; csvRowNumber < strings.length; csvRowNumber++) {
    // get a single row and split that row
    // into individual words
    singleRow = split(strings[csvRowNumber], ",");

    // We know that the last two fields are the
    // latitude and longitude and so they are
    // numerical:
    let longitude = float(singleRow[1]);
    let latitude = float(singleRow[2]);

    // The file may be missing a field, in which case
    // the converstion to a float might have failed
    if (isNaN(longitude) || isNaN(latitude)) {
      print("conversion to float failed; skipping row " + csvRowNumber);
    } else {
      if (csvRowNumber == 1) {
        minLat = latitude - 3;
        maxLat = latitude + 3;
        minLong = longitude - 3;
        maxLong = longitude + 3;
      }

      if (latitude < minLat) minLat = latitude;
      if (latitude > maxLat) maxLat = latitude;
      if (longitude < minLong) minLong = longitude;
      if (longitude > maxLong) maxLong = longitude;
    }
  } // end of for() loop

  print("Latitude (min, max) = (" + minLat + "," + maxLat + ") ");
  print("Longitude (min, max) = (" + minLong + "," + maxLong + ")");
} // end of findMinMaxLatLong

let csvRowNumber = 0
//I delete the header of the file so I will just start it from 0

function draw() {
  let singleRow = [];

  // get a single row and split that row into
  // individual words
  singleRow = split(strings[csvRowNumber], ",");

  // We know that all the fields I want in the file are are numerical:
  let longitude = float(singleRow[1]);
  let latitude = float(singleRow[2]);
  let depth = float(singleRow[3]);
  let magnitude = float(singleRow[4]);

  // Check for non-numerical strings.
  if (isNaN(longitude) || isNaN(latitude)) {
    print("conversion to float failed; skipping row " + csvRowNumber);
  } else {
    // scale that to fit on our canvas
    let ypos = map(latitude, minLat, maxLat, 0, height);
    let xpos = map(longitude, minLong, maxLong, 0, width);

    noStroke();
    // Put a mark there
    if(depth>5){fill(200/depth +220);}
    else{fill(0)}
    
    circle(xpos, ypos, magnitude*13);
  } // end of valid data

  csvRowNumber++;
  if (csvRowNumber >= strings.length) {
    print("finished");
    noLoop();
  }
}
````
