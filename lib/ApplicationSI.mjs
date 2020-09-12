import winax from "winax";
import Application from "./Application.mjs";

class ApplicationSI extends Application {
	constructor() {
		super(new winax.Object("Origin.ApplicationSI"));
	}
}

export default ApplicationSI;