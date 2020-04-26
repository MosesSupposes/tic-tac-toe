$(document).ready(() => {
	Utils.renderElement({
		parent: document.querySelector("#games"),
		child: Game.createBoard(),
	});
});
