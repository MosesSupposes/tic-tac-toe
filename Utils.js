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

		/**
		 * Determines if two objects are equal by value.
		 * It also works for arrays.
		 * @param {(Object|Array)} o1
		 * @param {Object|Array} o2
		 * @returns {Boolean}
		 */
		isEqual(o1, o2) {
			if (Array.isArray(o1) && Array.isArray(o2)) {
				for (let i = 0; i < o1.length; i++) {
					if (o1[i] === o2[i]) {
						continue;
					} else {
						return false;
					}
				}
				return true;
			} else if (typeof o1 == "object" && typeof o2 == "object") {
				const o1Keys = Object.keys(o1);
				const o2Keys = Object.keys(o2);

				for (let i = 0; i < o1Keys.length; i++) {
					if (o1Keys[i] == o2Keys[i]) {
						continue;
					} else {
						return false;
					}
				}
				return true;
			} else {
				throw new TypeError(
					"You must pass in either an object or an array to this function."
				);
			}
		},
	};
})();
