import DataObjectBase from "./DataObjectBase.mjs";
import {COLDATAFORMAT,DIGITMOD} from "./Enumerations.mjs";
import InvalidEnumException from "./Exceptions/InvalidEnumException.mjs";
import InvalidTypeException from "./Exceptions/InvalidTypeException.mjs";

class DataObject extends DataObjectBase {
	constructor(props) {
		super(props);
	}

	/**
	 * Setting and getting a column's data format type to one of the supported COLDATAFORMAT types.
	 * Setting a column's data format will erase any data in the column unlike the similar action performed from Origin's Column Property dialog.
	 * @returns {Promise<number>} - See COLDATAFORMAT
	 */
	get DataFormat () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let dataFormat = This.Instance.DataFormat;
			return onSuccess(dataFormat);
		});
	}

	/**
	 *
	 * @param {number} newDataFormat See COLDATAFORMAT
	 * @returns {Promise<DataObject>}
	 */
	async DataFormatSet (newDataFormat) {
		if (typeof newDataFormat !== "number")
			throw new InvalidEnumException("newDataFormat");

		this.Instance.DataFormat = newDataFormat;
		return this;
	}

	/**
	 * Current mode to set significant digits
	 * @returns {Promise<number>} - See DIGITMOD
	 */
	get DigitMode () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let digitMode = This.Instance.DigitMode;
			return onSuccess(digitMode);
		});
	}

	/**
	 *
	 * @param {number} newDigitMode
	 * @returns {Promise<DataObject>}
	 */
	async DigitModeSet (newDigitMode) {
		if (typeof newDigitMode !== "number")
			throw new InvalidEnumException("newDigitMode");

		this.Instance.DigitMode = newDigitMode;
		return this;
	}

	/**
	 * Number of digit in the decimal part
	 * @returns {Promise<number>} - An integer
	 */
	get Digits () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let digits = This.Instance.Digits;
			return onSuccess(digits);
		});
	}

	/**
	 *
	 * @param {number} newDigits
	 * @returns {Promise<DataObject>}
	 */
	async DigitsSet (newDigits) {
		if (typeof newDigits !== "number")
			throw new InvalidTypeException("newDigits");

		this.Instance.Digits = newDigits;
		return this;
	}

	/**
	 * An integer value indicate current display format of the column
	 * Remark:
	 *     0 to display as "Decimal:1000"
	 *     1 to display as "Scientific:1E3"
	 *     2 to display as "Engineering:1K"
	 *     3 to display as "Decimal:1,000"
	 * @returns {Promise<number>}
	 */
	get DisplayFormat () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let displayFormat = This.Instance.DisplayFormat;
			return displayFormat;
		});
	}

	/**
	 * See getter for possible values
	 * @param {number} newDisplayFormat
	 * @returns {Promise<DataObject>}
	 */
	async DisplayFormatSet (newDisplayFormat) {
		if (typeof newDisplayFormat !== "number")
			throw new InvalidTypeException("newDisplayFormat");

		this.Instance.DisplayFormat = newDisplayFormat;
		return this;
	}


}

export default DataObject;