import OriginObject from "./OriginObject.mjs";
import OLEContainer from "./OLEContainer.mjs";

class TreeNode extends OriginObject {
	constructor(props) {
		super(props);
	}

	/**
	 * @returns {Promise<TreeNode[]>}
	 */
	get Children () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let childCount = This.Instance.Children.Count;
			let children = [];

			for (let childIndex = 0; childIndex < childCount; childIndex++) {
				let child = This.Instance.Children[childIndex];
				children.push(new TreeNode(child));
			}

			return onSuccess(children);
		});
	}

	/**
	 * @returns {Promise<TreeNode>}
	 */
	get firstChild () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let firstChild = This.Instance.firstChild;
			return onSuccess(new TreeNode(firstChild));
		});
	}

	/**
	 * @returns {Promise<TreeNode>}
	 */
	get nextSibling () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let nextSibling = This.Instance.nextSibling;
			return onSuccess(new TreeNode(nextSibling));
		});
	}

	/**
	 * @returns {Promise<OLEContainer>}
	 */
	get Value () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let value = This.Instance.Value;
			return onSuccess(new OLEContainer(value));
		});
	}

	/**
	 * @param {*} someValue
	 * @returns {Promise<TreeNode>}
	 */
	async ValueSet (someValue) {
		if (someValue && someValue instanceof OLEContainer)
			this.Instance.Value = someValue.Instance;
		else
			this.Instance.Value = someValue;

		return this;
	}
}

export default TreeNode;