import DataObject from "./DataObject.mjs";
import {COLTYPES,ARRAYDATAFORMAT} from "./Enumerations.mjs";
import InvalidEnumException from "./Exceptions/InvalidEnumException.mjs";
import InvalidTypeException from "./Exceptions/InvalidTypeException.mjs";

class Column extends DataObject {
	constructor(props) {
		super(props);
	}

	/**
	 * Get a range of values or a single value from a worksheet column.
	 * @param {number} format - See ARRAYDATAFORMAT for possible values
	 * @param {number} [nStart=0] - Starting index to get array, default is 0
	 * @param {number} [nEnd=-1] - Inclusive ending index to get array, use -1(default) to get all
	 * @param {number} [lowbound=0] - Optional array offset index. This is typically 0, but for VB, user can DIM array with any integer offset, and often it is 1 in VB.
	 * @returns {Promise<*[]>} - Array as a variant. Actual array type is dependent on the format argument.
	 */
	async GetData (
		format,
		nStart = 0,
		nEnd= -1,
		lowbound = 0
	) {
		let data = this.Instance.GetData(format, nStart, nEnd, lowbound);
		return data;
	}

	/**
	 * Put an array of values to a column object.
	 * @param {*[]} data - The 1D array of data to be set into the column
	 * @param {number} [nOffset=0] - Starting row index. Default is zero, the first row. If set to -1 then data is appended to the end of the column
	 * @returns {Promise<boolean>} - A boolean value with true indicating set data successfully and false indicating it is failed
	 */
	async SetData (
		data,
		nOffset = 0
	) {
		let result = this.Instance.SetData(data, nOffset);
		return !!result;
	}

	/**
	 *
	 * @param {number} X0 - The initial value of X.
	 * @param {number} XInc - The increment of X.
	 * @param {string} Units - A string of the unit of X axis. For example, if X axis is a time line, then the Unit could be "ms".
	 * @param {string} LongName - A string of the LongName of X axis. For example, "Time".
	 * @param {string} DispFormat - A string of display format of numbers. For example, "%8.2f"
	 * @returns {Promise<boolean>}
	 */
	async SetEvenSampling (
		X0,
		XInc,
		Units,
		LongName,
		DispFormat
	) {
		let result = this.Instance.SetEvenSampling(X0, XInc, Units, LongName, DispFormat);
		return result;
	}

	/**
	 * Sample rate of the column
	 * @returns {Promise<string>}
	 */
	get EvenSampling () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let evenSampling = This.Instance.EvenSampling;
			return onSuccess(evenSampling);
		});
	}

	/**
	 * An alias to SetEvenSampling, for compat reasons
	 */
	async EvenSamplingSet () {
		return this.SetEvenSampling.apply(this, arguments);
	}

	/**
	 * Paramters stored in a column
	 * @param {number} Index
	 * @returns {Promise<string>}
	 */
	async ParameterGet (Index) {
		let parameter = this.Instance.Parameter[Index];
		return parameter;
	}

	/**
	 * For compat reasons
	 * @returns {Promise<number>}
	 */
	get ParameterCount () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let parameterCount = This.Instance.Parameter.Count;
			return onSuccess(parameterCount);
		})
	}

	/**
	 * Number of rows that have data in this column
	 * @returns {Promise<number>}
	 */
	get Rows () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let rows = This.Instance.Rows;
			return onSuccess(rows);
		})
	}

	/**
	 * Column destination type such as X, Y, Z
	 * See COLTYPES for possible values
	 * @returns {Promise<number>}
	 */
	get Type () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let type = This.Instance.Type;
			return onSuccess(type);
		});
	}

	/**
	 *
	 * @param {number} newColType - See COLTYPES
	 * @returns {Promise<Column>}
	 */
	async TypeSet (newColType) {
		if (typeof newColType !== "number")
			throw new InvalidEnumException("newType");

		this.Instance.Type = newColType;
		return this;
	}

	/**
	 * @returns {Promise<string>}
	 */
	get Units () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let units = This.Instance.Units;
			return onSuccess(units);
		});
	}

	/**
	 *
	 * @param {string} newUnits
	 * @returns {Promise<Column>}
	 */
	async UnitsSet (newUnits) {
		if (typeof newUnits !== "string")
			throw new InvalidEnumException("newUnits");

		this.Instance.Units = newUnits;
		return this;
	}

	/**
	 * @param {number} Index - 0 offset index for user defined label in column
	 * @returns {Promise<string>}
	 */
	async UserDefLabelGet (Index) {
		let userDefLabel = this.Instance.UserDefLabel[Index];
		return userDefLabel;
	}

	/**
	 * For compat reasons
	 * @returns {Promise<number>}
	 */
	get UserDefLabelCount () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let userDefLabelCount = This.Instance.UserDefLabel.Count;
			return onSuccess(userDefLabelCount);
		});
	}

}

export default Column;