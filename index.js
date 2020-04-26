$(document).ready(() => {
	const game1 = new Game.GameSession();

	$("button[type='submit']").on("click", function (event) {
		event.preventDefault();
		Game.player1.name =
			$("#p1Name")[0].value === "" ? "Player 1" : $("#p1Name")[0].value;
		Game.player2.name =
			$("#p2Name")[0].value === "" ? "Player 2" : $("#p2Name")[0].value;

		game1.startGame();
	});

	const $allGames = $(".board");

	$allGames.on("click", function (event) {
		// console.log(event.target);
		const targetSlot = $(this).find(event.target);
	});
});
