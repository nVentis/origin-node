import OLEContainer from "./OLEContainer.mjs";
import PendingImplementationException from "./Exceptions/PendingImplementationException.mjs";
import {STGDATAFMT} from "./Enumerations.mjs";

class OriginObject extends OLEContainer {
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
	 * Get value stored by SetBinaryStorageData with specified name
	 * @param {string} Name
	 * @param {number} format - See Enumerations.STGDATAFMT
	 * @returns {Promise<object>}
	 */
	async GetBinaryStorageData (Name, format) {
		return this.Instance.GetBinaryStorageData(Name, format);
	}

	/**
	 * Get information tree of an Origin object with an xmlDocument structure
	 * @param {string} Name - Name of the XML
	 * @param {boolean} bVisibleToUser - If it is false, XML will no longer be visible from book organizer, but can be accessed from Origin C program
	 * @returns {Promise<string>} - A string XML
	 */
	async GetMetaData (Name, bVisibleToUser ) {
		return this.Instance.GetMetaData(Name, bVisibleToUser);
	}

	/**
	 *
	 * @param {string} Name - Name of the binary storage
	 * @param {any} values - Data of the binary storage
	 * @returns {Promise<void>}
	 */
	async SetBinaryStorageData (Name, values) {
		return this.Instance.SetBinaryStorageData(Name, values);
	}

	/**
	 *
	 * @param {string} xml - A string XML
	 * @param {string} Name - Name of the XML
	 * @param {boolean} bVisibleToUser - If it is false, XML will no longer be visible from book organizer, but can be accessed from Origin C program
	 * @returns {Promise<boolean>} - A boolean value with true indicating set meta data successfully and false indicating it is failed.
	 */
	async SetMetaData (xml, Name, bVisibleToUser) {
		return this.Instance.SetMetaData(xml, Name, bVisibleToUser);
	}

	/**
	 *
	 * @returns {Promise<string[]>}
	 */
	get BinaryStorageNames () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let binaryStorageCount = This.Instance.Children.Count;
			let binaryStorageNames = [];

			for (let binaryStorageIndex = 0; binaryStorageIndex < binaryStorageCount; binaryStorageIndex++) {
				let binaryStorageName = This.Instance.BinaryStorageNames[binaryStorageIndex];
				binaryStorageNames.push("" + binaryStorageName);
			}

			return onSuccess(binaryStorageNames);
		});
	}

	/**
	 * Indicate the position of this object in current container
	 * @returns {Promise<number>}
	 */
	get Index () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			return onSuccess(This.Instance.Index);
		});
	}

	/**
	 * The long name of this origin object
	 * @returns {Promise<string>}
	 */
	get LongName () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			return onSuccess(This.Instance.LongName);
		});
	}

	/**
	 *
	 * @param {string} newLongName
	 * @returns {Promise<OriginObject>}
	 */
	async LongNameSet (newLongName) {
		this.Instance.LongName = newLongName;
		return this;
	}

	/**
	 * Name of the Origin object
	 * @returns {Promise<string>}
	 */
	get Name () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			return onSuccess(This.Instance.Name);
		});
	}

	/**
	 *
	 * @param {string} newName
	 * @returns {Promise<OriginObject>}
	 */
	async NameSet (newName) {
		this.Instance.Name = newName;
		return this;
	}

	/**
	 * Get an origin object's visible status
	 * @returns {Promise<boolean>}
	 */
	get Show () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			return onSuccess(This.Instance.Show !== 0);
		});
	}

	/**
	 * Set an origin object's visible status
	 * @param {boolean} newShow
	 * @returns {Promise<OriginObject>}
	 */
	async ShowSet (newShow) {
		this.Instance.Show = (!!newShow) ? 1 : 0;
		return this;
	}
}

export default OriginObject;