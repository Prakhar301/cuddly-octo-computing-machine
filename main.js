song="";
scoreRightWrist=0;
scoreLeftWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.position(500,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("PoseNet Initalized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.xx;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Left Wrist X="+leftWristX+"Left Wrist Y="+leftWristY);
        console.log("Right Wrist X="+rightWristX+"Right Wrist Y="+rightWristY);
        scoreRightWrist = results[0].pose.keypoints[10].score;  
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right wrist="+scoreRightWrist+"Score Left wrist="+scoreLeftWrist);
    }
    else{
        document.getElementById("danger").innerHTML="There is some problem";    
    }
}
function draw(){
    image(video,0,0,600,500);
    fill('#52ffab');
    stroke('#ae4deb');
    if(scoreRightWrist > 0.2){ 
		circle(rightWristX,rightWristY,20);
        if(rightWristY >0 && rightWristY <= 100){
		document.getElementById("speed").innerHTML = "Speed = 0.5x";		
		song.rate(0.5);
	    }
	    else if(rightWristY >100 && rightWristY <= 200){
		document.getElementById("speed").innerHTML = "Speed = 1x";		
		song.rate(1);
	    }
		else if(rightWristY >200 && rightWristY <= 300){
			document.getElementById("speed").innerHTML = "Speed = 1.5x";		
			song.rate(1.5);
		}
		else if(rightWristY >300 && rightWristY <= 400){
			document.getElementById("speed").innerHTML = "Speed = 2x";		
			song.rate(2);
		}
	    else if(rightWristY >400){
		    document.getElementById("speed").innerHTML = "Speed = 2.5x";		
		    song.rate(2.5);
	    }
    }
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        newLeftWristY=Number(leftWristY);
        finalLeftWristY=floor(newLeftWristY);
        volume=finalLeftWristY/500;
        document.getElementById("htv").innerHTML="Volume:"+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}