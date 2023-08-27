const tagCatalog = [
	{
		'postag': 'pos', //0
		'elements': [
			{'value': 'v', 'expanded': 'verb'}, 
			{'value': 'n', 'expanded': 'noun'}, 
			{'value': 'a', 'expanded': 'adjective'}, 
			{'value': 'p', 'expanded': 'pron.'}, 
			{'value': 'd', 'expanded': 'adv.'}, 
			{'value': 'c', 'expanded': 'conj.'}, 
			{'value': 'r', 'expanded': 'prep.'}, 
			{'value': 'm', 'expanded': 'num.'}, 
			{'value': 'e', 'expanded': 'excl.'}
		]
	},
	{
		'postag': 'person', //1
		'elements': [
			{'value': '-', 'expanded': ' '}, 
			{'value': '1', 'expanded': '1'}, 
			{'value': '2', 'expanded': '2'}, 
			{'value': '3', 'expanded': '3'}
		]
	},
	{
		'postag': 'number', //2
		'elements': [
			{'value': '-', 'expanded': ' '}, 
			{'value': 's', 'expanded': 'sg.'}, 
			{'value': 'p', 'expanded': 'pl.'}
		]
	},
	{
		'postag': 'tense', //3
		'elements': [
			{'value': '-', 'expanded': ' '}, 
			{'value': 'p', 'expanded': 'pres.'}, 
			{'value': 'r', 'expanded': 'pf.'}, 
			{'value': 'i', 'expanded': 'impf.'}, 
			{'value': 'f', 'expanded': 'fut.'}, 
			{'value': 't', 'expanded': 'futpf.'}, 
			{'value': 'l', 'expanded': 'plupf.'}
		]
	},
	{
		'postag': 'mood', //4
		'elements': [
			{'value': '-', 'expanded': ' '}, 
			{'value': 'i', 'expanded': 'ind.'}, 
			{'value': 'n', 'expanded': 'inf.'}, 
			{'value': 's', 'expanded': 'subj.'}, 
			{'value': 'm', 'expanded': 'imperat.'}, 
			{'value': 'd', 'expanded': 'gerund'}, 
			{'value': 'g', 'expanded': 'gerundive'}, 
			{'value': 'u', 'expanded': 'supine'}, 
			{'value': 'p', 'expanded': 'ppl.'}
		]
	},
	{
		'postag': 'voice', //5
		'elements': [
			{'value': '-', 'expanded': ' '}, 
			{'value': 'a', 'expanded': 'act.'}, 
			{'value': 'd', 'expanded': 'dep.'}, 
			{'value': 'p', 'expanded': 'pass.'}
		]
	},
	{
		'postag': 'gender', //6
		'elements': [
			{'value': '-', 'expanded': ' '}, 
			{'value': 'm', 'expanded': 'm.'}, 
			{'value': 'f', 'expanded': 'f.'}, 
			{'value': 'n', 'expanded': 'n.'}
		]
	},
	{
		'postag': 'case', //7
		'elements': [			
			{'value': '-', 'expanded': ' '}, 
			{'value': 'n', 'expanded': 'nom.'}, 
			{'value': 'g', 'expanded': 'gen.'}, 
			{'value': 'd', 'expanded': 'dat.'}, 
			{'value': 'a', 'expanded': 'acc.'}, 
			{'value': 'b', 'expanded': 'abl.'}, 
			{'value': 'v', 'expanded': 'voc.'}, 
			{'value': 'l', 'expanded': 'loc.'}
		]
	},
	{
		'postag': 'degree', //8
		'elements': [
			{'value': '-', 'expanded': ' '}, 
			{'value': 'p', 'expanded': ' '}, 
			{'value': 'c', 'expanded': 'comp.'}, 
			{'value': 's', 'expanded': 'super.'}
		]
	}
	];

	function doPOS(tag) {
	var i,j,answer = '';
	let wordPos = [];
	tag = tag.split('');
	for (i in tagCatalog) {
	for (j in tagCatalog[i].elements) {
			if (tag[i] === tagCatalog[i].elements[j].value) {
				wordPos.push(tagCatalog[i].elements[j].expanded);
			}
	}};
	if (tag[0] === 'n' || tag[0] === 'a' || tag[0] === 'p' || tag[0] === 'm') {
		answer = `${wordPos[7]} ${wordPos[2]} ${wordPos[6]} ${wordPos[8]}`;
	} else if (tag[4] === 'p') { // participle: 
		answer = `${wordPos[3]} ${wordPos[5]} ${wordPos[4]}, ${wordPos[7]} ${wordPos[2]} ${wordPos[6]}`;
	} else if (tag[4] === 'n') { // infinitive: 
		answer = `${wordPos[3]} ${wordPos[5]} ${wordPos[4]}`;
	} else if (tag[4] === 'g' || tag[4] === 'd' || tag[4] === 'u') { // gerund / gerundive / supine: 
		answer = `${wordPos[4] + ', ' + wordPos[7]} ${wordPos[2]} ${wordPos[6]}`;
	} else if (tag[0] === 'v') { // verbs: 1 2 3 5 4
		answer = `${wordPos[1]} ${wordPos[2]} ${wordPos[3]} ${wordPos[5]} ${wordPos[4]}`;
	} else if (tag[0] === 'd') { // adverbs
		answer = `${wordPos[0]} ${wordPos[8]}`;
	} else if (tag[0]) { // the rest
		answer = `${wordPos[0]}`;
	};
	return answer;
};





const doInfo = function(event) {
    if (event.target.attributes.getNamedItem('data-pos')) {
        let mousedWord = event.target;

        let wordForm = (mousedWord.textContent) ? mousedWord.textContent : `&nbsp;`;
        let wordDict = (mousedWord.dataset.dict) ? mousedWord.dataset.dict : ' ';
        var wordPos = (mousedWord.dataset.pos) ? doPOS(mousedWord.dataset.pos) : ' ';
        let wordDef = (mousedWord.dataset.def) ? mousedWord.dataset.def : ' ';

        // Clear the existing content of the #info element
        const infoElement = document.querySelector('#info');
        infoElement.textContent = '';

        // Create text nodes for each part of the infoBox
        const entryText = document.createTextNode(wordForm);
        const posText = document.createTextNode(wordPos);
        const vocabText = document.createTextNode(wordDict);
        const vocab2Text = document.createTextNode(wordDef);

        // Create and append list elements
        const entrySpan = document.createElement('span');
        entrySpan.id = 'entry';
        entrySpan.appendChild(entryText);

        const posLi = document.createElement('li');
        posLi.id = 'pos';
        posLi.appendChild(posText);

        const vocabLi = document.createElement('li');
        vocabLi.className = 'vocab';
        vocabLi.appendChild(vocabText);

        const vocab2Li = document.createElement('li');
        vocab2Li.className = 'vocab2';
        vocab2Li.appendChild(vocab2Text);

        // Append the elements to the #info element
        infoElement.appendChild(entrySpan);
        infoElement.appendChild(posLi);
        infoElement.appendChild(vocabLi);
        infoElement.appendChild(vocab2Li);
    }
};


const doLink = function(event) {
	if (event.target.attributes.getNamedItem('data-pos')) {
		let clickedWord = event.target;
		let wordLookup = clickedWord.dataset.lookup || '';
		let url = 'https://logeion.uchicago.edu/' + wordLookup;
		window.open(url, '_blank');
	}
};

const bubbleTop = document.querySelector('#main');
bubbleTop.addEventListener('mouseover', doInfo, false);
window.matchMedia('(hover: hover)').matches ? bubbleTop.addEventListener('click', doLink, false) : bubbleTop.addEventListener('touchstart', doInfo, false);


const DoSyntaxLink = function(event) {
	if (event.target.attributes.getNamedItem('data-syntax')) {
	  let clickedWord = event.target;
	  let syntaxLookup = clickedWord.dataset.syntax || '';
	  let url = 'https://dcc.dickinson.edu/grammar/latin/' + syntaxLookup;
	  window.open(url, '_blank'); // Opens the link in a new tab/window
	}
  };
  
  // Attach the event listener to the main element
  const main = document.getElementById('main');
  main.addEventListener('click', DoSyntaxLink);

