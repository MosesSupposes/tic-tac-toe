const Game = (function () {
	let nextGameId = 0;
	const player1 = { name: "p1", mark: "X", wins: 0 };
	const player2 = { name: "p2", mark: "O", wins: 0 };

	const winningCombinations = [
		[1, 2, 3],
		[1, 4, 7],
		[1, 5, 9],
		[2, 5, 8],
		[4, 5, 6],
		[7, 8, 9],
		[3, 5, 7],
		[3, 6, 9],
	];

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

	const determineIfPlayerWon = gameBoard => {
		let foundWinningCombination = false;
		let wasADraw = false;
		let winner = null;
		let currentStateOfBoard = [];
		const $slots = $(gameBoard).find(".slot");
		$slots.each(function (index, slot) {
			currentStateOfBoard.push({ index: index + 1, mark: slot.innerHTML });
		});
		const allXs = currentStateOfBoard.filter(({ index, mark }) => mark === "X");
		const allOs = currentStateOfBoard.filter(({ index, mark }) => mark === "O");

		let slotsForAllXs = allXs.map(x => x.index);
		let slotsForAllOs = allOs.map(o => o.index);
		winningCombinations.forEach(combo => {
			let [firstSlot, secondSlot, thirdSlot] = combo;
			if (
				slotsForAllXs.includes(firstSlot) &&
				slotsForAllXs.includes(secondSlot) &&
				slotsForAllXs.includes(thirdSlot)
			) {
				foundWinningCombination = true;
				winner = player1;
			} else if (
				slotsForAllOs.includes(firstSlot) &&
				slotsForAllOs.includes(secondSlot) &&
				slotsForAllOs.includes(thirdSlot)
			) {
				foundWinningCombination = true;
				winner = player2;
			} else if (allXs.length + allOs.length === 9) {
				wasADraw = true;
			}
		});

		if (foundWinningCombination || wasADraw) {
			return {
				gameWon: true,
				winner,
			};
		} else {
			return {
				gameWon: false,
				winner,
			};
		}
	};

	return {
		player1,
		player2,
		GameSession: class {
			static allGames = [];

			constructor(board = createBoard()) {
				this.gameBoard = board;
				this.gameId = nextGameId;
				this.player1 = player1;
				this.player2 = player2;
				this.currentTurn = player1;
				this.winner = null;
			}

			startGame() {
				Utils.renderElement({
					parent: document.querySelector("#games"),
					child: this.gameBoard,
				});
				this.constructor.allGames.push({
					gameId: this.gameId,
					gameBoard: this.gameBoard,
					winner: this.winner,
					gameSession: this,
				});
			}

			nextTurn() {
				this.currentTurn =
					this.currentTurn == this.player1 ? this.player2 : this.player1;
			}

			makeMove(slotId) {
				const slot = $(this.gameBoard).find(`.slot[data-slot-id=${slotId}]`);
				slot[0].innerHTML = this.currentTurn.mark;
				const { gameWon, winner } = determineIfPlayerWon(this.gameBoard);
				gameWon ? this.gameOver(winner) : this.nextTurn();
			}

			gameOver(winner) {
				if (winner) {
					this.winner = winner;
					winner.wins++;
				}

				this.constructor.allGames.map(game => {
					if (game.gameId === this.gameId) {
						game.winner = this.winner;
						return game;
					} else {
						return game;
					}
				});

				const GameOverEvent = new CustomEvent("gameOver", {
					bubbles: true,
					cancelable: true,
					detail: {
						gameId: this.gameId,
						winner: this.winner,
					},
				});

				this.gameBoard.dispatchEvent(GameOverEvent);
			}
		},
	};
})();
