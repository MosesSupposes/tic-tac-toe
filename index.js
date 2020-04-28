$(document).ready(() => {
	const game1 = new Game.GameSession();

	$("button[type='submit']").on("click", function startGameAndAddListeners(
		event
	) {
		event.preventDefault(); // prevent the page from reloading
		Game.player1.name =
			$("#p1Name")[0].value === "" ? "Player 1" : $("#p1Name")[0].value;
		Game.player2.name =
			$("#p2Name")[0].value === "" ? "Player 2" : $("#p2Name")[0].value;

		// render the game board to the screen
		game1.startGame();
		// render the win count
		$("#p1Wins")
			.text(`${Game.player1.name}: ${Game.player1.wins} wins`)
			.fadeIn(200);
		$("#p2Wins")
			.text(`${Game.player2.name}: ${Game.player2.wins} wins`)
			.fadeIn(200);

		/*  The following logic reders click handlers for all rendered
			board games. By the time this code runs, there will only be 
			one board on the screen; therefore this code is a little 
			over-the-top. However, this implementation allows for more 
			flexibility in the future -- if say for some reason we decided
			to render more than one board on initial page load.
		*/

		const $allGames = $(".board");

		$allGames.on("click", function renderMarkToScreen(event) {
			const eventTargetsGameId = $(event.target) // event target's gameId
				.parents()
				.find(".board")
				.attr("data-game-id");
			const targetSlot = $(this).find(event.target)[0].dataset.slotId;
			const currentGame = Game.GameSession.allGames.find(
				game => game.gameId === parseInt(eventTargetsGameId)
			);
			currentGame.gameSession.makeMove(targetSlot);
		});
	});

	// When a game ends, alert the user with who the winner was, display
	// the new score, and render a new game board to the screen
	$(document).on("gameOver", function alertWinnerAndUpdateScoreAndStartNextGame(
		event
	) {
		alert(`Winner: ${event.detail.winner.name}`);

		$("#p1Wins").text(`${Game.player1.name}: ${Game.player1.wins} wins`);
		$("#p2Wins").text(`${Game.player2.name}: ${Game.player2.wins} wins`);

		const newGame = new Game.GameSession();
		newGame.startGame();
		$(`.board[data-game-id=${newGame.gameId}]`).on(
			"click",
			function renderMarkToScreen(event) {
				const targetSlot = $(this).find(event.target)[0].dataset.slotId;
				newGame.makeMove(targetSlot);
			}
		);
	});
});
