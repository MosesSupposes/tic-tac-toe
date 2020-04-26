const Game = (function () {
	let nextGameId = 0;
	const player1 = { mark: "X", wins: 0 };
	const player2 = { mark: "O", wins: 0 };

	const createBoard = function () {
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
	};

	return {
		GameSession: class {
			constructor(board = createBoard()) {
				this.gameBoard = board;
				this.gameId = nextGameId;
				this.player1 = player1;
				this.player2 = player2;
				this.currentTurn = player1;
			}

			startGame() {
				Utils.renderElement({
					parent: document.querySelector("#games"),
					child: this.gameBoard,
				});
			}

			nextTurn() {
				this.currentTurn = this.currentTurn = this.player1
					? this.player2
					: this.player1;
			}

			makeMove(slotId) {
				$(this.gameBoard).find(
					`.slot[data-slot-id=${slotId}]`
				).innerHTML = this.currentTurn.mark;
				this.nextTurn();
			}

			gameOver(winner) {
				winner.wins++;
			}
		},
	};
})();
