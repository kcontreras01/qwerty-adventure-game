//make qwerty change with imgs

$(function(){
// var gameStart = new Audio('ChibiNinja.mp3');
// gameStart.play();
  
 $("#volume").on("click", function(evt) {
   evt.stopPropagation(); 
   $(this).toggleClass("fa-volume-up");
   $(this).toggleClass("fa-volume-off");

   // $("#audio")[0].pause();
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
		background: '',
		qwerty: './img/donut.png',
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
		background: '',
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
			scene: "Win",
			},
			{
			answer: "Meow loudly",
			scene: 'End',
		}]  
	},
		{
		id: 6,
		name: 'Sick',
		text: 'Qwerty eats the fuzzy cookie and gets sick! Qwerty gets in trouble and the human has to take you to the vet. Game Over.',
		background: '', 
		choice: [{
			answer: "Restart",
			scene: "Start",
			}],  
	},
		{
		id: 7,
		name: 'End',
		text: "The human catches you and you're in trouble! Game Over",
		background: '',
		choice: [{
			answer: "Restart",
			scene: "Start",
			}],  
		},
	{
		id: 8,
		name: 'Win',
		text: 'Qwerty gets her fill of food and falls asleep again. What an awesome day.',
		background: '',  
		choice: [{
			answer: "Restart",
			scene: "Start",
			}],
	},
]

function addQwerty(){
	//add character to page
	 // var qwerty = $('<div class="qwerty"></div>');
  //  document.body.append(qwerty);
	var qwerty = document.createElement('div');
	qwerty.classList.add('qwerty');
	document.body.append(qwerty);

	setInterval(function(){
    $(qwerty).toggleClass("stand");
	}, 1000);

	// setTimeout(function(){
	// 	$(qwerty).toggleClass('stand').off();
	// } 10000);
}

addQwerty();

//this function adds a div, appends it to the scene, makes that scene active, and creates 
// answer buttons with their text inside.
function makeScene3(sceneName){
	$(".active-scene").remove();
	var myScene = getSceneByName(sceneName);
	var $scene = $(".scene");
	var $activeScene = $("<div></div")
													.appendTo($scene)
													.addClass("active-scene")
													// .css("background",`url(${myScene.background})`)
													.css(".qwerty",`url(${myScene.qwerty})`)
	$("<p></p>").appendTo($activeScene).text(myScene.text);
	var answerObjs = getAnswersBySceneName2(sceneName);
	for (var i in answerObjs){
		var answerObj = answerObjs[i];
		//var $button = $("<button></button>")
		//									.appendTo($activeScene);
		var $mydiv = $("<div></div>")
											.appendTo($activeScene)
											.addClass("p")

		var $ptag = $("<p></p>")
											
											.attr("next-scene", answerObj.scene)
											.text(answerObj.answer)
											.click(sceneClick)
											.appendTo($mydiv);

		//$ptag.wrap("<div></div>");
		//$ptag.appendto($activeScene);
		// $(answerObj).addClass('p');
		// if a p tag is added inside the button tag the font can be resized
	}
}

//this function targets what has been clicked and gives it the attribute next-scene - 
// moves scenes forward
function sceneClick(){
	var $button = $(this);
	var nextScene = $button.attr("next-scene");
	makeScene3(nextScene);
};


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
	//console.log(initScene['text']);
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

// var scenes = 
// 	['start', 'Qwerty is awoken by a rumbling belly', "", ["Wake my human", "end", "Look under the couch", 'couch']],
// 	['couch', 'Qwerty gets on her belly and crawls under the couch. She finds a suspicious fuzzy cookie.', "", ["Eat the cookie", "sick", "Look under the table", 'table']]],
// 	['table', 'Qwerty avoids the fuzzy cookie and makes her way to the table. The human is sitting there.', "", ["Look under the table", "end", "Avoid human", 'food']]],
// 	['food', 'Qwerty makes her way to the closet where her food is kept. The human has left it open', "", ["Go in the closet", "win", "Sit outside", 'end']],
// 	['end', 'Qwerty is in trouble and gets no food', "", 'start'],

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
