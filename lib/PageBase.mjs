import OriginObject from "./OriginObject.mjs";
import {PAGETYPES} from "./Enumerations.mjs";

class PageBase extends OriginObject {
	constructor(props) {
		super(props);
	}


	/**
	 * An Integer value represent the page type
	 * See PAGETYPES
	 * @returns {Promise<number>}
	 */
	get Type () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let type = This.Instance.Type;
			return onSuccess(type);
		});
	}
}

export default PageBase;