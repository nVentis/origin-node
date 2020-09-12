import OLEContainer from "./OLEContainer.mjs";
import Application from "./Application.mjs";

class OriginBase extends OLEContainer {
	constructor(props) {
		super(props);
	}

	/**
	 * Refer to the current Origin instance
	 * @returns {Promise<Application>}
	 */
	get Application () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let application = This.Instance.Application;
			return onSuccess(new Application(application));
		});
	}
}

export default OriginBase;