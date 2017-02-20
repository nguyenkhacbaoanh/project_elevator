var Elevator = (function() {
  var isMoving;
  var elevator = document.querySelector("#elevator"); 
  var btn = document.querySelector("#btn");
  
  var create_btn = function(n) {   //create the button
    var stair = ''
    for (i = 0;i <= n; i++) {
      stair += '<button id="stage' + i + '">' + i + '</button>'
    };
    btn.innerHTML = stair;
  }
  
  var funcMove = function(target) {   
    var currentStage = document.querySelector("#stage");
    var chosenStage = Number(target.id.replace('stage',''));
    var move;
    
    if (Number(currentStage.textContent) == chosenStage || isMoving ) {
      return false;
    }
    isMoving = true ;
    
    currentStage.textContent = chosenStage;
    document.querySelector('#stage'+chosenStage).classList.add("light");
    if (chosenStage == 0) {
      move = 100;
    } else {
      var step = Math.floor(100/(document.querySelectorAll("#btn button").length - 1));
      move = 100 - step*chosenStage;
    }
    elevator.style.top = move + "%";
  }
  
  var moveElevator  = function() {
    btn.addEventListener('click', function(e) {
          if (e.target.tagName.toLowerCase() == 'button') {
            funcMove(e.target);
          }
    });
    
      elevator.addEventListener('transitionend', function(event) {
        var currentStage = document.querySelector("#stage");
        isMoving = false;
        document.querySelector('#stage' + Number(currentStage.textContent)).classList.remove("light");
      }, false);
  }
  return {
    floor: create_btn,
    move: moveElevator
  };
})();

Elevator.floor(5);
Elevator.move();