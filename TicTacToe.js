'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboard')
		.addEventListener('click', markField);	
	document.querySelector('#NewGame')
		.addEventListener('click', ShowButton);
	document.querySelector('#NewGame')
		.addEventListener('click', NewGame);
	var current = 0,
		players = ['x', 'o'],
		winner,
		finished, // Flag für Spiel-ist-zuende; 
		fields = document.querySelectorAll('#gameboard button'),
		hint = document.querySelector('#hint');
		//hint = document.getElementById('hint');

	//function newGame(e) {
	//	var newGame = e.target;
	//	if (newGame == true) {
	//		location.reload();
			//	return false;
	//	}
	//}

	function ShowButton(divName){
		//Gibt es das Objekt mit dem Namen der in divName übergeben wurde?
		if(document.getElementById(divName)){
		 /*"Sichtbarkeit" des Divs umschalten. 
		 Wenn es sichtbar war, unsichtbar machen und umgedreht.*/
		 document.getElementById(divName).style.display = 'inline';
		}
	   }

	function NewGame(divName){
		 location.reload();
	}

	function markField(e) {
		var field = e.target;
		field.setAttribute('aria-label', players[current]);
		field.setAttribute('disabled', 'disabled');
		current = 1 - current;
		hint.innerText = 'Spieler ' + players[current] + ' ist am Zug.';
		checkIfCompleted();
	}

	function checkIfCompleted() {
		var fields = document.querySelectorAll('#gameboard button'), // fields ist die Liste unserer Felder
			full = true; // wir gehen davon aus, dass alle Zellen benutzt wurden
		// alle Felder markiert?
		for (var i = 0; i < fields.length; i++) {
			if (!fields[i].hasAttribute('disabled')) {
				full = false;
			}
		}
		// wenn full, dann Spiel vorbei, wenn nicht full, dann noch nicht
		if (full) {
			full = true;
		}
		// Gewinner ermitteln
		for (i = 0; i < 4; i++) {
			// 3 senkrecht
			if (fields[0 + i].getAttribute('aria-label') != null 
				&& fields[0 + i].getAttribute('aria-label') == fields[4 + i].getAttribute('aria-label') 
				&& fields[4 + i].getAttribute('aria-label') == fields[8 + i].getAttribute('aria-label')
				&& fields[8 + i].getAttribute('aria-label') == fields[12 + i].getAttribute('aria-label')) {
				// we have a winner!
				highlightCells([fields[i], fields[4 + i], fields[8 + i], fields[12 + i]]);
				winner = fields[0 + i].getAttribute('aria-label');
			}
			// 3 waagrecht
			if (fields[i * 4].getAttribute('aria-label') != null 
				&& fields[i * 4].getAttribute('aria-label') == fields[i * 4 + 1].getAttribute('aria-label') 
				&& fields[i * 4 + 1].getAttribute('aria-label') == fields[i * 4 + 2].getAttribute('aria-label')
				&& fields[i * 4 + 2].getAttribute('aria-label') == fields[i * 4 + 3].getAttribute('aria-label')) {
				// we have a winner!
				highlightCells([fields[i * 4], fields[i * 4 + 1], fields[i * 4 + 2], fields[i * 4 + 3]]);
		 		winner = fields[i * 4].getAttribute('aria-label');
			}
		}
		// diagonal links oben nach rechts unten
		if (fields[0].getAttribute('aria-label') != null 
				&& fields[0].getAttribute('aria-label') == fields[5].getAttribute('aria-label') 
				&& fields[5].getAttribute('aria-label') == fields[10].getAttribute('aria-label')
				&& fields[10].getAttribute('aria-label') == fields[15].getAttribute('aria-label')) {
			highlightCells([fields[0], fields[5], fields[10], fields[15]]);
			winner = fields[0].getAttribute('aria-label');
		}
		// diagonal rechts oben nach links unten
		if (fields[3].getAttribute('aria-label') != null 
				&& fields[3].getAttribute('aria-label') == fields[6].getAttribute('aria-label') 
				&& fields[6].getAttribute('aria-label') == fields[9].getAttribute('aria-label')
				&& fields[9].getAttribute('aria-label') == fields[12].getAttribute('aria-label')) {
			highlightCells([fields[3], fields[6], fields[9], fields[12]]);
			winner = fields[3].getAttribute('aria-label');
		}
		// Game over?
		if (full || winner) {
			finished = true;
			if (winner = 'x' || winner == 'o') {
				hint.innerText = 'Das Spiel ist zu Ende, weil Spieler ' + winner +
					' gewonnen hat!';
				hint.className = 'success';
			} else {
				// Spiel zu Ende weil alle Felder belegt
				hint.innerText =
					'Das Spiel endet unentschieden, weil alle Felder belegt sind.';
				hint.className = 'warning';
			}
			ShowButton("NewGame");
			//new game?
			//var newGame = confirm('Neues Spiel?', '');
			//if (newGame == true) {
			//	location.reload();
			//	return false;
			//}
		}
	}


	function highlightCells(cells) {
		for (var i = 0; i < 4; i++) {
			cells[i].classList.add('highlighted');
		}
	}
});
