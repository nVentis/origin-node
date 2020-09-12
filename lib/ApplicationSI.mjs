import winax from "winax";
import Application from "./Application.mjs";

/**
 * Attach to an existing Origin instance if one exists. If none exist, then launch a new instance.
 */
class ApplicationSI extends Application {
	constructor() {
		super(new winax.Object("Origin.ApplicationSI"));
	}
}

export default ApplicationSI;