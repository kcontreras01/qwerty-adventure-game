$(function(){
  
$("#volume").on("click", function(evt) {
   evt.stopPropagation(); 
   $(this).toggleClass("fa-volume-up");
   $(this).toggleClass("fa-volume-off");

   if ($(this).hasClass("fa-volume-off")){
   	document.getElementById("audio").pause();
  }
   else {
    document.getElementById("audio").play();
  }
});

var scenes = [
	{
		id: 1,
		name: 'Start',
		text: "Qwerty is awoken by a rumbling belly. As she looks at the clock it's currently 5am. She has two options, wake up the human or search around the apartment.",
		background: '',
		choice: [{
			answer: "Wake my human",
			scene: "End",
			},
			{
			answer: "Search the apartment",
			scene: 'Couch',
		}]  
	},
	{
		id: 2,
		name: 'Couch',
		text: 'Qwerty gets up and looks around. She smells underneath the couch and finds a suspicious fuzzy cookie. How long has this been here?',
		choice: [{
			answer: "Eat the cookie",
			scene: "Sick",
			},
			{
			answer: "Keep on searching",
			scene: 'Table',
		}]  
	},
	{
		id: 3,
		name: 'Table',
		text: 'Qwerty avoids the fuzzy cookie and makes her way to the table. The human is sitting there drinking hot bean water. From here she can see food fell under the table.',
		choice: [{
			answer: "Look under the table",
			scene: "Pizza",
			},
			{
			answer: "Avoid human",
			scene: 'Food',
		}]  
	},
	{
		id: 4,
		name: 'Pizza',
		text: 'Qwerty sneaks under the table quietly and finds some pizza. Yum! She gobbles it up but still wants more.',
		choice: [{
			answer: "Ask my human",
			scene: "End",
			},
			{
			answer: "Keep searching",
			scene: 'Food',
		}]  
	},
	{
		id: 5,
		name: 'Food',
		text: 'Qwerty makes her way to the closet where her food is kept. The door is slightly ajar.',
		background: './img/closet.jpg',
		choice: [{
			answer: "Paw at the door",
			scene: "Cabinet",
			},
			{
			answer: "Meow loudly",
			scene: 'End',
		}]  
	},
	{
		id: 6,
		name: 'Sick',
		text: 'Qwerty eats the fuzzy cookie and gets sick! Qwerty gets in trouble and the human has to take you to the vet. Game Over!',
		choice: [{
			answer: "Restart",
			scene: "Start",
			}],  
	},
	{
		id: 7,
		name: 'Cabinet',
		text: "Qwerty makes her way out of the closet to continue her search. From here she can see the large china cabinet and wonders if there is ever any food up there.",
		choice: [{
			answer: "Jump on the cabinet",
			scene: "End",
			},
			{
			answer: "Look under the bed",
			scene: 'Bed',
		}]  
	},
	{
		id: 8,
		name: 'Bed',
		text: "Qwerty makes her way under the bed on her belly and finds a lonely cracker! She gobbles it up.",
		choice: [{
			answer: "Take a nap",
			scene: "Win",
			},
			{
			answer: "Find more noms",
			scene: 'Noms',
		}]  
	},
	{
		id: 9,
		name: 'Noms',
		text: "Qwerty is almost full. Just one more snack will satisfy. It's not so early anymore, maybe we can ask the human for food.",
		choice: [{
			answer: "Ask my human",
			scene: "Ask",
		}], 
	},
	{
		id: 10,
		name: 'Ask',
		text: "Qwerty meows softly and makes big eyes at her human. The human give in and Qwerty is fed.",
		background: '',
		choice: [{
			answer: "Take a nap",
			scene: "Win",
		}],
	}, 
	{
		id: 11,
		name: 'End',
		text: "The human catches you and you're in trouble! Game Over!",
		choice: [{
			answer: "Restart",
			scene: "Start",
		}],  
	},
	{
		id: 12,
		name: 'Win',
		text: 'Qwerty gets her fill of food and falls asleep again. What an awesome day.', 
		choice: [{
			answer: "Restart",
			scene: "Start",
		}],
	},
];

function addQwerty(){
	//add character to page
	var qwerty = document.createElement('div');
	qwerty.classList.add('qwerty');
	document.body.append(qwerty);

	setInterval(function(){
    $(qwerty).toggleClass("stand");
	}, 1000);
}

//this function adds a div, appends it to the scene, makes that scene active, and creates 
// answer buttons with their text inside.
function makeScene3(sceneName){
	$('.cookie').removeClass();
	$('.sick').removeClass();
	// addQwerty();
	$(".active-scene").remove();
	var myScene = getSceneByName(sceneName);
	var $scene = $(".scene");
	var $activeScene = $("<div></div")
			.appendTo($scene)
			.addClass("active-scene")
	$("<p></p>").appendTo($activeScene).text(myScene.text);
	var answerObjs = getAnswersBySceneName2(sceneName);
	for (var i in answerObjs){
		var answerObj = answerObjs[i];
		var $mydiv = $("<div></div>")
			.appendTo($activeScene)
			.addClass("p")

		var $ptag = $("<p></p>")									
			.attr("next-scene", answerObj.scene)
			.text(answerObj.answer)
			.click(sceneClick)
			.appendTo($mydiv);
	}
}

//this function targets what has been clicked and gives it the attribute next-scene - 
// moves scenes forward
function sceneClick(){
	var $button = $(this);
	var nextScene = $button.attr("next-scene");
	makeScene3(nextScene);

	var found = scenes.filter(function(elem){
	if (elem.name === nextScene) {
		return true;
	} else {
		return false;
	}
});

	if (found.length > 0 && found[0].name === "Win"){
		var win = $('<div></div>')
		$('body').append(win)
			.addClass('cookie');
  	$( ".qwerty" ).animate({
			left: "800px"
  	}, 1500 );
   	$( ".qwerty" ).animate({
			left: "0px"
  	}, 1500 );
	};

		if (found.length > 0 && found[0].name === "Sick"){
		var sick = $('<div></div>')
		$('body').append(win)
			.addClass('sick');
	};
}


function chooseFirstScene(){
	var initScene = scenes[0];
	console.log(initScene.text);
	//grab the choice array
	var choiceArray = initScene.choice;
	//iterate over choice and display answers
	for (var i in choiceArray){
		 var choiceObj = choiceArray[i];
		 console.log(choiceObj.answer);
	}
}

//connects scene answers to next scene with same name
function getSceneByName(sceneName){
	var foundArray = scenes.filter(function(elem){
		if (elem['name'] === sceneName) {
			return true;
		} else {
			return false;
		}
	});

	var foundScene = foundArray[0];
	return foundScene;
}

//returns array of answer objects
function getAnswersBySceneName2(sceneName){
	var sceneObj = getSceneByName(sceneName);
	var result = [];
	for (var i in sceneObj.choice){
		var choiceElem = sceneObj.choice[i];
		result.push(choiceElem);
	}
	return result;
}

addQwerty();
makeScene3('Start');

});

//returns only array of strings OLD OLD OLD
// $.fn.getAnswersBySceneName = function (sceneName){
// 	var sceneObj = $.fn.getSceneByName(sceneName);
// 	var result = [];
// 	for (var i in sceneObj.choice){
// 		var choiceElem = sceneObj.choice[i];
// 		result.push(choiceElem.answer);
// 	}
// 	return result;
	
// }

// function addChoices(){
// 	// show scenes on screen
// 	scenes.forEach(function(elm, i) {
// 		// elm.text.forEach(function(elm, i){
// 			// return scenes.text;
// 			return scenes[i].text;
// 			})
// 		// })
// 	}

// function makeScene(){
// 		//look through array and make scene
// 		// $('scenes').each(function(){
// 	scenes.forEach(function(elm, i){
// 		// document.body.append(elm.text); 
// 		$('body').append(elm.text);
// 			// text.classList('p');
// 		elm.choice.filter(function(elm, i){
// 			// $('scenes').find('choice').each(function(elm, i){
// 		// document.body.append(elm.answer); adds choices to page outside of button
// 		// var button1 = document.getElementById('button1'); 
// 		// var button1 = $(this).get(button1);
// 		//button1.append(elm.answer);
// 		//button2.append(elm.answer);

// 		})
// 	})
// }
//makeScene();

//THIS WORKS BUT THE BUTTONS DON"T HAVE ENOUGH DATA OLD OLD OLD
// $.fn.makeScene2 = function(sceneName){
// 	$(".active-scene").remove();
// 	var $scene = $(".scene");
// 	var $activeScene = $("<div></div").appendTo($scene).text("yo yo");
// 	var myScene = $.fn.getSceneByName(sceneName);
// 	$("<h1></h1>").appendTo($activeScene).text(myScene.text);
// 	var answers = $.fn.getAnswersBySceneName(sceneName);
// 	for (var i in answers){
// 		var answer = answers[i];
// 		$("<button></button>").appendTo($activeScene).text(answer);
// 	}
// }
