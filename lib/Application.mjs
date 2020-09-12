import winax from "winax";
import OLEContainer from "./OLEContainer.mjs";
import Worksheet from "./Worksheet.mjs";
import WorksheetPage from "./WorksheetPage.mjs";
import GraphLayer from "./GraphLayer.mjs";
import {APPPATH_TYPES} from "./Enumerations.mjs";
import InvalidTypeException from "./Exceptions/InvalidTypeException.mjs";

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
	 * The BeginSession method reserves the current Origin session for exclusive use.
	 * It has no meaning in the case of multi-instance Origin automation objects (Origin.Application,),
	 * in which case, any connection creates a separate Origin session.
	 * @returns {Promise<boolean>}
	 */
	async BeginSession () {
		return this.Instance.BeginSession();
	}

	/**
	 * The EndSession method ends the exclusive use of the current Origin session.
	 * It has no meaning in the case of multi-instance Origin automation objects (Origin.Application,),
	 * in which case, any connection creates a separate Origin session.
	 *
	 * After a client calls BeginSession no other clients will be able to connect to Origin until the client that called BeginSession calls EndSession.
	 * This allows a client to perform its tasks to completion without interference from other clients.
	 * This behavior is only available with Origin Pro. The BeginSession and EndSession methods have no affect on non-Pro Origin.
	 * @returns {Promise<boolean>}
	 */
	async EndSession () {
		return this.Instance.EndSession();
	}

	/**
	 * Exit Origin
	 * @returns {Promise<boolean>} - A boolean value with true indicating Origin exited and false indicating it did not exit.
	 */
	async Exit () {
		return this.Instance.Exit();
	}

	/**
	 *
	 * @param {string} Name
	 * @returns {Promise<GraphLayer|null>}
	 */
	async FindGraphLayer (Name) {
		let graphLayer = this.Instance.FindGraphLayer(Name);
		if (graphLayer)
			return new GraphLayer(graphLayer);
		else
			return null;
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
		let worksheetPages = await this._WorksheetPages;
		let firstFoundIndex = null;

		for (let worksheetPageIndex = 0; worksheetPageIndex < worksheetPages.length; worksheetPageIndex++) {
			let worksheetPage = worksheetPages[worksheetPageIndex];
			if (worksheetPage.LongName === LongName && firstFoundIndex === null) {
				firstFoundIndex = worksheetPageIndex;
			} else
				winax.release(worksheetPage);
		}

		if (firstFoundIndex !== null)
			return new Worksheet(worksheetPages[firstFoundIndex]);
		else
			return null;
	}

	/**
	 * Load the specified Origin project file, replacing the contents of the current Origin session.
	 * @param {string} path - The full path and name where to load the Origin project from
	 * @param {boolean} [readonly=false] - An optional argument used to indicate the project should be loaded as read-only. If not specified then the project will be loaded as read-write.
	 * @returns {Promise<boolean>} True if successful else false
	 */
	async Load (
		path,
		readonly = false
	) {
		return !!this.Instance.Load(path, readonly);
	}

	/**
	 * Returns a string containing the requested Origin path (including file extension)
	 * @param {number} Type - See APPPATH_TYPES enumeration
	 * @returns {Promise<string>}
	 */
	async Path (Type) {
		let path = this.Instance.Path(Type);
		return path;
	}

	/**
	 * Save the current Origin session to an Origin project (OPJ) file
	 * @param {string} path - Including file extension
	 * @returns {Promise<boolean>} - True if successful else false.
	 */
	async Save (path) {
		return !!this.Instance.Save(path);
	}

	/**
	 * When Origin is connected to another application via COM, you can no longer close down Origin until the controlling application terminates.
	 * The CanClose property when set to true (default is false) will make Origin hidden when user click the x button to close Origin.
	 * So this properly is essentially Hide-On-Close.
	 * @returns {Promise<boolean>}
	 */
	get CanClose () {
		let This = this;
		return new Promise((onSuccess, onError) => onSuccess(!!This.Instance.CanClose));
	}

	/**
	 *
	 * @param {boolean} newIsModified
	 * @returns {Promise<Application>}
	 */
	async IsModifiedSet (newIsModified) {
		if (typeof newIsModified !== "boolean")
			throw new InvalidTypeException("newIsModified");

		this.Instance.IsModified = newIsModified;
		return this;
	}

	/**
	 * IsModified property sets or clears modified flag for currently open Origin project without saving it.
	 * @returns {Promise<boolean>}
	 */
	get IsModified () {
		let This = this;
		return new Promise((onSuccess, onError) => onSuccess(!!this.Instance.IsModified));
	}

	/**
	 *
	 * @returns {Promise<winax.Object[]>}
	 */
	get _WorksheetPages () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let worksheetCount = this.Instance.WorksheetPages.Count;
			let worksheets = [];

			for (let worksheetIndex = 0; worksheetIndex < worksheetCount; worksheetIndex++) {
				let worksheet = this.Instance.WorksheetPages[worksheetIndex];
				worksheets.push(worksheet);
			}

			return onSuccess(worksheets);
		});
	}

	/**
	 *
	 * @returns {Promise<WorksheetPage[]>}
	 */
	get WorksheetPages () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let worksheetPageCount = this.Instance.WorksheetPages.Count;
			let worksheetPages = [];

			for (let worksheetPageIndex = 0; worksheetPageIndex < worksheetPageCount; worksheetPageIndex++) {
				let worksheetPage = this.Instance.WorksheetPages[worksheetPageIndex];
				worksheetPages.push(new WorksheetPage(worksheetPage));
			}

			return onSuccess(worksheetPages);
		});
	}
}

export default Application;