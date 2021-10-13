status1="";
objects=[];
input1="";
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

    if(status1 != ""){
        document.getElementById("status").innerHTML="Status: Objects Detected";
        objectDetector.detect(video,gotResults);

        for(var i=0; i < objects.length; i++){
            fill('blue');
            percent =floor(objects[i].confidence  * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke('blue');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            synth=window.speechSynthesis;

            if(objects[i].label == input1){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("info"),innerHTML=input1+" found";
               // synth=window.speechSynthesis;
                var utterThis=new SpeechSynthesisUtterance(input1+" found")
                synth.speak(utterThis);
                utterThis.cancel();
            }
            else{
                video.play();
                document.getElementById("info").innerHTML=input1+" not found";
                var utterThis=new SpeechSynthesisUtterance(input1+" not found")
                synth.speak(utterThis);
                utterThis.cancel();
            }
        }
    }

}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input1=document.getElementById("input").value;
}

function modelLoaded(){
    console.log('Model Loaded!!!');
    status1=true;
}

function gotResults(error,results){
    if(error){
    console.error(error)
    }
    else{
        console.log(results);
        objects=results;
    }
}