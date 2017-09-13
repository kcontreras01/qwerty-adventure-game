$(function(){

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
		background: '',
		choice: [{
			answer: "Wake my human",
			scene: "end",
			},
			{
			answer: "Look under the couch",
			scene: 'couch',
		}]  
	},
	{
		id: 2,
		name: 'Couch',
		text: 'Qwerty gets on her belly and crawls under the couch. She finds a suspicious fuzzy cookie.',
		background: '',
		choice: [{
			answer: "Eat the cookie",
			scene: "sick",
			},
			{
			answer: "Look under the table",
			scene: 'table',
		}]  
	},
	{
		id: 3,
		name: 'table',
		text: 'Qwerty avoids the fuzzy cookie and makes her way to the table. The human is sitting there.',
		background: '',
		choice: [{
			answer: "Look under the table",
			scene: "end",
			},
			{
			answer: "Avoid human.",
			scene: 'food',
		}]  
	},
	{
		id: 4,
		name: 'Food',
		text: 'Qwerty makes her way to the closet where her food is kept. The human has left it open',
		background: '',
		choice: [{
			answer: "Go in the closet",
			scene: "win",
			},
			{
			answer: "Sit outside",
			scene: 'end',
		}]  
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
	scenes.forEach(function(elm, i){
		elm.choice.forEach(function(elm, i){
			document.body.append(elm.answer);
		})
	})
}
makeScene();


function addChoices(){
	// show choices on screen
	var choices = scenes[3][1];
	for(var i = 0; i < choices.length; i++){

	}
}

// nextScene()
// scene[3]

// render()
//


})
