status="";

function preload(){
}

function setup(){
canvas=createCanvas(450,400);
canvas.position(459,230);
video=createCapture(VIDEO);
video.hide();
}

function draw(){
    image(video,0,0,450,400);
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input=document.getElementById("input").value;
}

function modelLoaded(){
    console.log('Model Loaded!!!');
    status=true;
}