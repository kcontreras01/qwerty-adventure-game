var jq = $(function(){

// var scenes = 
// 	['start', 'Qwerty is awoken by a rumbling belly', "", ["Wake my human", "end", "Look under the couch", 'couch']],
// 	['couch', 'Qwerty gets on her belly and crawls under the couch. She finds a suspicious fuzzy cookie.', "", ["Eat the cookie", "sick", "Look under the table", 'table']]],
// 	['table', 'Qwerty avoids the fuzzy cookie and makes her way to the table. The human is sitting there.', "", ["Look under the table", "end", "Avoid human", 'food']]],
// 	['food', 'Qwerty makes her way to the closet where her food is kept. The human has left it open', "", ["Go in the closet", "win", "Sit outside", 'end']],
// 	['end', 'Qwerty is in trouble and gets no food', "", 'start'],


var scenes = [
	{
		id: 1,
		name: 'Start',
		text: 'Qwerty is awoken by a rumbling belly',
		background: './img/livingroom.jpg',
		choice: [{
			answer: "Wake my human",
			scene: "End",
			},
			{
			answer: "Look under the couch",
			scene: 'Couch',
		}]  
	},
	{
		id: 2,
		name: 'Couch',
		text: 'Qwerty gets on her belly and crawls under the couch. She finds a suspicious fuzzy cookie.',
		background: '',
		choice: [{
			answer: "Eat the cookie",
			scene: "Sick",
			},
			{
			answer: "Look under the table",
			scene: 'Table',
		}]  
	},
	{
		id: 3,
		name: 'Table',
		text: 'Qwerty avoids the fuzzy cookie and makes her way to the table. The human is sitting there.',
		background: '',
		choice: [{
			answer: "Look under the table",
			scene: "End",
			},
			{
			answer: "Avoid human.",
			scene: 'Food',
		}]  
	},
	{
		id: 4,
		name: 'Food',
		text: 'Qwerty makes her way to the closet where her food is kept. The human has left it open',
		background: '',
		choice: [{
			answer: "Go in the closet",
			scene: "Win",
			},
			{
			answer: "Sit outside",
			scene: 'End',
		}]  
	},
		{
		id: 5,
		name: 'Sick',
		text: 'Qwerty eats the fuzzy cookie and gets sick! Qwerty gets in trouble and the human has to take you to the vet. Game Over.',
		background: '',  
	},
		{
		id: 6,
		name: 'End',
		text: "The",
		background: '',  
	},
	{
		id: 7,
		name: 'Win',
		text: 'Qwerty gets her fill of food and falls asleep again. What an awesome day.',
		background: '',  
	},
]


function addQwerty(){
	//add character to page
	var qwerty = document.createElement('div');
	qwerty.classList.add('qwerty');
	document.body.append(qwerty);

}
addQwerty();

function makeScene(){
		//look through array and make scene
		// $('scenes').each(function(){
	scenes.forEach(function(elm, i){
		// document.body.append(elm.text); 
		$('body').append(elm.text);
			// text.classList('p');
		elm.choice.filter(function(elm, i){
			// $('scenes').find('choice').each(function(elm, i){
		// document.body.append(elm.answer); adds choices to page outside of button
		// var button1 = document.getElementById('button1'); 
		// var button1 = $(this).get(button1);
		//button1.append(elm.answer);
		//button2.append(elm.answer);

		})
	})
}
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


$.fn.makeScene3 = function(sceneName){
	$(".active-scene").remove();
	var $scene = $(".scene");
	var $activeScene = $("<div></div")
													.appendTo($scene)
													.addClass("active-scene")
													.text("Active Scene");
	var myScene = $.fn.getSceneByName(sceneName);
	$("<h1></h1>").appendTo($activeScene).text(myScene.text);
	var answerObjs = $.fn.getAnswersBySceneName2(sceneName);
	for (var i in answerObjs){
		var answerObj = answerObjs[i];
		var $button = $("<button></button>")
											.appendTo($activeScene)
											.attr("next-scene", answerObj.scene)
											.text(answerObj.answer)
											.click(sceneClick);
		
	}
}

function sceneClick(){
	var $button = $(this);
	var nextScene = $button.attr("next-scene");
	$.fn.makeScene3(nextScene);
};

$.fn.chooseFirstScene = function (){
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


$.fn.getSceneByName = function (sceneName){
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

//returns array of answer objects
$.fn.getAnswersBySceneName2 = function (sceneName){
	var sceneObj = $.fn.getSceneByName(sceneName);
	var result = [];
	for (var i in sceneObj.choice){
		var choiceElem = sceneObj.choice[i];
		result.push(choiceElem);
	}
	return result;
	
}


// function addChoices(){
// 	// show scenes on screen
// 	scenes.forEach(function(elm, i) {
// 		// elm.text.forEach(function(elm, i){
// 			// return scenes.text;
// 			return scenes[i].text;
// 			})
// 		// })
// 	}

// function nextScene(){

// }	
})


// nextScene()
// scene[3]

// render()
//

