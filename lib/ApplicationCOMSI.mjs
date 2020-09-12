import Application from "./Application.mjs";
import winax from "winax";

/**
 * ApplicationCOMSI connects to an existing instance of Origin that was also launched using the ApplicationCOMSI class.
 * If there is not already an Origin instance that was launched using the ApplicationCOMSI class then a new instance will be launched.
 */
class ApplicationCOMSI extends Application {
	constructor() {
		super(new winax.Object("Origin.ApplicationCOMSI"));
	}
}

export default ApplicationCOMSI;
