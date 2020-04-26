const Game = (function () {
	let nextGameId = 0;

	return {
		createBoard() {
			const board = document.createElement("article");
			$(board).addClass("board");
			board.dataset.gameId = ++nextGameId;

			const row1 = Utils.createElements(["div", "div", "div"]).map(
				(div, index) => {
					div.classList.add("slot");
					div.dataset.slotId = index + 1;
					return div;
				}
			);

			const row2 = Utils.createElements(["div", "div", "div"]).map(
				(div, index) => {
					div.classList.add("slot");
					div.dataset.slotId = index + 4;
					return div;
				}
			);

			const row3 = Utils.createElements(["div", "div", "div"]).map(
				(div, index) => {
					div.classList.add("slot");
					div.dataset.slotId = index + 7;
					return div;
				}
			);

			[row1, row2, row3].forEach(row => {
				const rowContainer = document.createElement("div");
				$(rowContainer).addClass("row");
				Utils.renderElement({ parent: board, child: rowContainer });
				Utils.renderElements({ parent: rowContainer, children: row });
			});

			return board;
		},
	};
})();
