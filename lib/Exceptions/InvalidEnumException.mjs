import GenericOriginNodeException from "./GenericOriginNodeException.mjs";

export default class InvalidEnumException extends GenericOriginNodeException {
	/**
	 * @param {string} message
	 * @param {string} [code=null]
	 */
	constructor(message, code) {
		super(message, "InvalidEnumException", code);
	}
}