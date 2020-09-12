import GenericOriginNodeException from "./GenericOriginNodeException.mjs";

export default class InvalidTypeException extends GenericOriginNodeException {
	/**
	 * @param {string} message
	 * @param {string} [code=null]
	 */
	constructor(message, code) {
		super(message, "InvalidTypeException", code);
	}
}