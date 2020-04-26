const Utils = (function () {
	return {
		createElements(elements = []) {
			return elements.map(elementName => document.createElement(elementName));
		},

		renderElement({ parent, child }) {
			if (child instanceof HTMLElement) {
				parent.append(child);
			} else if (typeof child == "string") {
				child = document.createElement(child);
				parent.append(child);
			} else {
				throw new TypeError(
					"The child object must be an HTMLElement or a string"
				);
			}

			return parent;
		},

		renderElements({ parent, children = [] }) {
			children.forEach(child => {
				if (typeof child == "string") {
					child = document.createElement(child);
				}
				parent.append(child);
			});

			return parent;
		},

		refresh() {
			window.location.reload();
		},
	};
})();
