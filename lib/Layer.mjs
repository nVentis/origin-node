import OriginObject from "./OriginObject.mjs";
import Application from "./Application.mjs";

/**
 * @class
 * @extends OriginObject
 */
class Layer extends OriginObject {
	constructor(props) {
		super(props);
	}

	/**
	 * Set object as active in current container
	 * @returns {Promise<*>}
	 */
	async Activate () {
		return this.Instance.Activate();
	}

	/**
	 * Destroy Origin object
	 * @returns {Promise<number>}
	 */
	async Destroy () {
		return this.Instance.Destroy();
	}

	/**
	 * Run LabTalk script in the context of the object, so that the script can assume the object is the active object. This is applicable to Layer and Page objects only.
	 * @param {string} LabTalkStr
	 * @returns {Promise<0>} If no error occured
	 */
	async Execute (LabTalkStr) {
		return this.Instance.Execute(LabTalkStr);
	}

	/**
	 * Refer to the current Origin instance
	 * @returns {Application}
	 */
	get Application () {
		return new Application(this.Instance.Application);
	}

	/**
	 * Indicate the position of this object in current container
	 * @returns {number}
	 */
	get Index () {
		return this.Instance.Index;
	}

	/**
	 * The long name of this origin object
	 * @returns {string}
	 */
	get LongName () {
		return this.Instance.LongName;
	}

	/**
	 * Name of the Origin object
	 * @returns {string}
	 */
	get Name () {
		return this.Instance.Name;
	}

	/**
	 * Get an origin object's visible status
	 * @returns {boolean}
	 */
	get Show () {
		return this.Instance.Show !== 0;
	}

	/**
	 * Set an origin object's visible status
	 * @param {boolean} newShow
	 */
	set Show (newShow) {
		this.Instance.Show = (!!newShow) ? 1 : 0;
	}
}

export default Layer;