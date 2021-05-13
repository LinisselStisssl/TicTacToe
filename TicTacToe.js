'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboard')
		.addEventListener('click', markField);
	var current = 0,
		players = ['x', 'o'],
		winner,
		finished, // Flag für Spiel-ist-zuende; 
		fields = document.querySelectorAll('#gameboard button'),
		hint = document.querySelector('#hint');

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
			if (fields[0 + i].getAttribute('aria-label') != "" 
				&& fields[0 + i].getAttribute('aria-label') == fields[4 + i].getAttribute('aria-label') 
				&& fields[4 + i].getAttribute('aria-label') == fields[8 + i].getAttribute('aria-label')
				&& fields[8 + i].getAttribute('aria-label') == fields[12 + i].getAttribute('aria-label')) {
				// we have a winner!
				winner = fields[0 + i].getAttribute('aria-label');
				highlightCells([fields[i], fields[4 + i], fields[8 + i], fields[12 + i]]);
			}
			// 3 waagrecht
			if (fields[i * 4].getAttribute('aria-label') != "" 
				&& fields[i * 4].getAttribute('aria-label') == fields[i * 4 + 1].getAttribute('aria-label') 
				&& fields[i * 4 + 1].getAttribute('aria-label') == fields[i * 4 + 2].getAttribute('aria-label')
				&& fields[i * 4 + 2].getAttribute('aria-label') == fields[i * 4 + 3].getAttribute('aria-label')) {
				// we have a winner!
				winner = fields[i * 4].getAttribute('aria-label');
				highlightCells([fields[i * 4], fields[i * 4 + 1], fields[i * 4 + 2], fields[i * 4 + 3]]);
			}
		}
		// diagonal links oben nach rechts unten
		if (fields[0].getAttribute('aria-label') != "" 
				&& fields[0].getAttribute('aria-label') == fields[5].getAttribute('aria-label') 
				&& fields[5].getAttribute('aria-label') == fields[10].getAttribute('aria-label')
				&& fields[10].getAttribute('aria-label') == fields[15].getAttribute('aria-label')) {
			winner = fields[0].getAttribute('aria-label');
			highlightCells([fields[0], fields[5], fields[10], fields[15]]);
		}
		// diagonal rechts oben nach links unten
		if (fields[3].getAttribute('aria-label') != "" 
				&& fields[3].getAttribute('aria-label') == fields[6].getAttribute('aria-label') 
				&& fields[6].getAttribute('aria-label') == fields[9].getAttribute('aria-label')
				&& fields[9].getAttribute('aria-label') == fields[12].getAttribute('aria-label')) {
			winner = fields[3].getAttribute('aria-label');
			highlightCells([fields[3], fields[6], fields[9], fields[12]]);
		}
		// Game over?
		if (full || winner) {
			finished = true;
			if (winner == 'x' || winner == 'o') {
				hint.innerText = 'Das Spiel ist zu Ende, weil Spieler ' + winner +
					' gewonnen hat!';
				hint.className = 'success';
			} else {
				// Spiel zu Ende weil alle Felder belegt
				hint.innerText =
					'Das Spiel endet unentschieden, weil alle Felder belegt sind.';
				hint.className = 'warning';
			}
			//new game?
			var newGame = confirm('Neues Spiel?', '');
			if (newGame == true) {
				location.reload();
				return false;
			}
		}
	}

	function highlightCells(cells) {
		for (var i = 0; i < 4; i++) {
			cells[i].classList.add('highlighted');
		}
	}
});