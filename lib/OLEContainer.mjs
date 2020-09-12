import winax from "winax";

class OLEContainer {
	/**
	 * @type {winax.Object}
	 */
	Instance = null;

	constructor(winaxObject) {
		this.Instance = winaxObject;
	}
}

export default OLEContainer;