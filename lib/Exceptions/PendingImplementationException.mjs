import GenericOriginNodeException from "./GenericOriginNodeException.mjs";

export default class PendingImplementationException extends GenericOriginNodeException {
	/**
	 * @param {string} message
	 * @param {string} [code=null]
	 */
	constructor(message, code) {
		super(message, "PendingImplementationException", code);
	}
}