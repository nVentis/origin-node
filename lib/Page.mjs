import PageBase from "./PageBase.mjs";
import Layer from "./Layer.mjs";

class Page extends PageBase {
	constructor(props) {
		super(props);
	}

	/**
	 * The collection of layers(sheets) in current page
	 * @returns {Promise<Layer[]>}
	 */
	get Layers () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let layerCount = This.Instance.Layers.Count;
			let layers = [];

			for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
				let layer = This.Instance.Layers[layerIndex];
				layers.push(layer);
			}

			return onSuccess(layers);
		});
	}
}

export default Page;