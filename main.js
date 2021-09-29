status="";
objects=[];
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

    if(status != ""){

        for(var i=0; i < objects.length; i++){
            fill('skyblue');
            percent =floor(objects[i].confidence  * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke('skyblue');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("info"),innerHTML="Status: "+input+" found";
                synth=window.speechSynthesis;
                var utterThis=new SpeechSynthesisUtterance(input+" found")
                synth.speak(utterThis);
            }
            else{
                document.getElementById("info").innerHTML=input+" not found";
            }
        }
    }

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

function gotResults(){
    if(error){
    console.error(error)
    }
    else{
        console.log(results);
        objects=results;
    }
}