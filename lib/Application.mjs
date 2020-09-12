import winax from "winax";
import OLEContainer from "./OLEContainer.mjs";
import Worksheet from "./Worksheet.mjs";

/**
 * @class
 * @extends OLEContainer
 */
class Application extends OLEContainer {
	constructor(oleObject) {
		if (!oleObject)
			oleObject = new winax.Object("Origin.Application");

		super(oleObject);
	}

	/**
	 * @returns {Promise<boolean>}
	 */
	async BeginSession () {
		return this.Instance.BeginSession();
	}

	/**
	 *
	 * @param {string} Name - The short name
	 * @returns {Promise<Worksheet|null>}
	 */
	async FindWorksheet (Name) {
		let worksheet = this.Instance.FindWorksheet(Name);
		if (worksheet)
			return new Worksheet(worksheet);
		else
			return null;
	}

	/**
	 * Returns the first Workbook matching the supplied LongName
	 * @param {string} LongName
	 * @returns {Promise<Worksheet|null>}
	 */
	async FindWorksheetByLongname (LongName) {
		let worksheets = this._WorksheetPages;
		let firstFoundIndex = null;

		for (let worksheetIndex = 0; worksheetIndex < worksheets.length; worksheetIndex++) {
			let worksheet = worksheets[worksheetIndex];
			if (worksheet.LongName === LongName && firstFoundIndex === null) {
				firstFoundIndex = worksheetIndex;
			} else
				winax.release(worksheet);
		}

		if (firstFoundIndex !== null)
			return new Worksheet(worksheets[firstFoundIndex]);
		else
			return null;
	}

	/**
	 *
	 * @returns {winax.Object[]}
	 */
	get _WorksheetPages () {
		let worksheetCount = this.Instance.WorksheetPages.Count;
		let worksheets = [];

		for (let worksheetIndex = 0; worksheetIndex < worksheetCount; worksheetIndex++) {
			let worksheet = this.Instance.WorksheetPages[worksheetIndex];
			worksheets.push(worksheet);
		}

		return worksheets;
	}

	/**
	 *
	 * @returns {Worksheet[]}
	 */
	get WorksheetPages () {
		let worksheetCount = this.Instance.WorksheetPages.Count;
		let worksheets = [];

		for (let worksheetIndex = 0; worksheetIndex < worksheetCount; worksheetIndex++) {
			let worksheet = this.Instance.WorksheetPages[worksheetIndex];
			worksheets.push(new Worksheet(worksheet));
		}

		return worksheets;
	}
}

export default Application;