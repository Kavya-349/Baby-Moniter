var objects = [];
var song = "";
var status = "";

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(300,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modalLoaded);
}

function modalLoaded() {
    console.log("modal Loaded");  
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video,0,0,300,300);
    if(status != "") {
        objectDetector.detect(video, gotResult);

        for(var i = 0; i < objects.length; i++) {
            if(objects[i].label == "person") {
                document.getElementById("baby_status").innerHTML = "Baby found";
                song.stop(); 
            } else {
                document.getElementById("baby_status").innerHTML = "Baby not found";
                song.play();   
        }
    } 
    }
}