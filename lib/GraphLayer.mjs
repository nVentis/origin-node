import Layer from "./Layer.mjs";
import DataPlot from "./DataPlot.mjs";
import DataObjectBase from "./DataObjectBase.mjs";
import Worksheet from "./Worksheet.mjs";

class GraphLayer extends Layer {
	constructor(props) {
		super(props);
	}

	/**
	 * @returns {DataObjectBase[]}
	 */
	get DataObjectBases () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let dataObjectBaseCount = This.Instance.DataObjectBases.Count;
			let dataObjectBases = [];

			for (let dataObjectBaseIndex = 0; dataObjectBaseIndex < dataObjectBaseCount; dataObjectBaseIndex++) {
				let dataObjectBase = This.Instance.DataObjectBases[dataObjectBaseIndex];
				dataObjectBases.push(new DataObjectBase(dataObjectBase));
			}

			return onSuccess(dataObjectBases);
		});
	}

	/**
	 * @returns {Promise<DataPlot[]>}
	 */
	get DataPlots () {
		let This = this;
		return new Promise((onSuccess, onError) => {
			let dataPlotCount = This.Instance.DataPlots.Count;
			let dataPlots = [];

			for (let dataPlotIndex = 0; dataPlotIndex < dataPlotCount; dataPlotIndex++) {
				let dataPlot = This.Instance.DataPlots[dataPlotIndex];
				dataPlots.push(new DataPlot(dataPlot));
			}

			return onSuccess(dataPlots);
		});
	}
}

export default GraphLayer;