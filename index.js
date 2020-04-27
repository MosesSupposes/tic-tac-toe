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

		$(document).on("gameOver", function alertWinner(event) {
			alert(`Winner: ${event.detail.winner.name}`);
		});

		const $allGames = $(".board");

		$allGames.on("click", function (event) {
			const targetSlot = $(this).find(event.target)[0].dataset.slotId;
			game1.makeMove(targetSlot);
		});
	});
});
