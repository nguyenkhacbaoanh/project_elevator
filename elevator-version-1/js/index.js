var Elevator = Elevator || {};
Elevator.init = function(stairNum){
    this.totalStage = stairNum;
    this.generateStair(this.totalStage);
    this.isMoving = false;
    this.totalStageButton = document.querySelectorAll('#jump-btn button');
    this.stageButtonContainer = document.querySelector('#jump-btn');
    this.elevator = document.querySelector('#elevator');
    this.eventsListener();
}
Elevator.eventsListener = function(){
    //move the elevator
    this.stageButtonContainer.addEventListener('click', function(e) {
      var target = e.target;
      if (target.tagName.toLowerCase() === 'button') {
        Elevator.moveElevator(target);
      }
    });
    //when transition done ~ elevator stops moving
    this.elevator.addEventListener("transitionend", function(event) {
    	var currentStage = document.querySelector("#stage-val");
      Elevator.isMoving = false;
      document.querySelector('#stage' + Number(currentStage.textContent)).classList.remove("active");
    }, false)
}
Elevator.generateStair = function (n) {
  var stairHTML = '';
  var i;
  for (i = 0; i < n; i++) {
    stairHTML += '<button class="' + '" id="stage' + i + '">' + i + '</button>'
  }
  document.querySelector('#jump-btn').innerHTML = stairHTML;
}
Elevator.moveElevator = function (target) {
  var currentStage = document.querySelector("#stage-val");
  var chosenStage = Number(target.id.replace('stage', ''));
  var step;
  if (this.isMoving || Number(currentStage.textContent) == chosenStage) {
    return false;
  }
  this.isMoving = true;
  currentStage.textContent = chosenStage;
    document.querySelector('#stage' + chosenStage).classList.add("active");
  if (chosenStage === 0) {
    step = 88;
  } else {
    step = Math.floor(100 / (this.totalStageButton.length - 1)); //exclude stage0
    step = 100 - step * chosenStage;
  }
  this.elevator.style.top = step + "%";
}
Elevator.init(4); //or Elevator.init(numberOfStairs)