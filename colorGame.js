
var colors = [];
 var squares = document.querySelectorAll(".square");
 var pickedColor;
 var colorDisplay = document.getElementById("colorDisplay");
 var messageDisplay = document.querySelector("#message");
 var h1Display = document.querySelector("h1");
 var resetButton = document.getElementById("reset");
 var playModes = document.querySelectorAll(".mode");
 //var easyBtn = document.querySelector("#easybtn");
 //var hardBtn = document.querySelector("#hardbtn");
 var numSquares = 6;

init();

function init(){
    //playModes event listeners
    setUpPlayModes();
    for(var i = 0; i < squares.length; i++){
        //add click listeners to squares
         squares[i].addEventListener("click", function(){
             //grab color of clicked square
             var clickedColor = this.style.backgroundColor;
             //compare color to pickedColor
             if(clickedColor === pickedColor){
                 messageDisplay.textContent = "Nice!";
                 changeColors(clickedColor);
                 resetButton.textContent = "Play Again"
             } else {
                 this.style.backgroundColor = '#232323';
                 messageDisplay.textContent = "Try Again";
             }
         });
     }

     reset();
}

 

function reset() {
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors"
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
 }

//  easyBtn.addEventListener("click", function(){
//     hardBtn.classList.remove("selected");
//     easyBtn.classList.add("selected");
//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for (var i =0; i < squares.length; i++){
//         if(colors[i]){
//             squares[i].style.backgroundColor = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
//  })

//  hardBtn.addEventListener("click", function(){
//     easyBtn.classList.remove("selected");
//     hardBtn.classList.add("selected");
//     numSquares = 6;    
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for (var i =0; i < squares.length; i++){
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//         }
// });


resetButton.addEventListener("click", (e) => {
    resetButton.classList.toggle('newcolors');
    resetButton.addEventListener('animationend', animationEndCallback);
     reset();
 });

animationEndCallback = (e) => {
    resetButton.removeEventListener('animationend', animationEndCallback);
    resetButton.classList.remove('newcolors');
}



 colorDisplay.textContent = pickedColor;

 

 function changeColors(color){
     //loop through all squares
     for(var i =0; i < squares.length; i++){
         //change each color to match given color
         squares[i].style.backgroundColor = color;
     }
 }
 function pickColor(){
     var random = Math.floor(Math.random() * colors.length);
     return colors[random];
 }

 function generateRandomColors(num){
    //make an array
    var arr = []
    //add num random colors to array
    for(var i = 0; i < num; i++){
        //get random color and push into arr
        arr.push(randomColor())  
    }    
    //return that array
    return arr;
 }

 function randomColor(){
     //pick a red from 0 to 255
     var r = Math.floor(Math.random() * 256);
     //pick a green from 0 to 255
     var g = Math.floor(Math.random() * 256);
     //pick a blue from 0 to 255
     var b = Math.floor(Math.random() * 256);
     return "rgb(" + r + ", " + g + ", " + b + ")";
 }

 function setUpPlayModes() {
    for(var i = 0; i < playModes.length; i++){
        playModes[i].addEventListener("click", function(){
            playModes[0].classList.remove("selected");
            playModes[1].classList.remove("selected");
            this.classList.add("selected");
            //the next line is an alternative to doing the if/else below
            //it is called a ternary operator. it says if text is "Easy"
            //then numSquares = 3, if not then it equals 6
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            //if(this.textContent === "Easy"){
            //    numSquares = 3;
            // } else {
            //    numSquares = 6;
            //}
            reset();
     });
    }
 }