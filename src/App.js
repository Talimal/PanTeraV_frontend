import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import TIRP from './DataStructures/TIRP';
import { CircularProgress } from '@material-ui/core';
import ExploreTree from './TreeView_master/ExploreTreeController';
import './TreeView_master/index.css';

const App = (props) => {
	const [tirpsJson, setTirpsJson] = useState({});
	const [tirpsReady, setTirpsReady] = useState(false);
	const [readyToExplore, setReadyToExplore] = useState(false);
	const symbolsToNames = useRef({});
	const [symbolsToTirps, setSymbolsToTirps] = useState({});

	const castTirpToJson = (tirpObject) => {
		return {
			size: tirpObject.getSize(),
			symbols: tirpObject.getSymbols(),
			symbols_names: tirpObject.getSymbolsNames(),
			relations: tirpObject.getRelations(),
			build_supporting_instances_0: tirpObject.getSupInstances0(),
			build_supporting_instances_1: tirpObject.getSupInstances1(),
			exist_in_class_0: tirpObject.getExistInClass0(),
			exist_in_class_1: tirpObject.getExistInClass1(),
			num_support_entities_0: tirpObject.getNumSupEnt_0(),
			num_support_entities_1: tirpObject.getNumSupEnt_1(),
			mean_horizontal_support_0: tirpObject.getMeanHorSup_0(),
			mean_horizontal_support_1: tirpObject.getMeanHorSup_1(),
			vertical_support_0: tirpObject.getVericalSup_0(),
			vertical_support_1: tirpObject.getVericalSup_1(),
			mean_duration_0: tirpObject.getMeanDur_0(),
			mean_duration_1: tirpObject.getMeanDur_1(),
			occurences_0: tirpObject.getOccurences_0(),
			occurences_1: tirpObject.getOccurences_1(),
			mean_of_first_interval_0: tirpObject.get_mean_of_first_interval_0(),
			mean_of_first_interval_1: tirpObject.get_mean_of_first_interval_1(),
			mean_offset_from_first_symbol_0: tirpObject.get_mean_offset_from_first_symbol_0(),
			mean_offset_from_first_symbol_1: tirpObject.get_mean_offset_from_first_symbol_1(),
			supporting_entities_properties_0: tirpObject.get_supporting_entities_properties_0(),
			supporting_entities_properties_1: tirpObject.get_supporting_entities_properties_1(),
		};
	};
	const findSymbolFromProps = () => {
		let symbol = Object.keys(symbolsToNames.current)[0];
		// let symbolFromProps = JSON.parse(sessionStorage['ExploreSymbol']);
		// for (var i = 0; i < Object.keys(symbolsToNames.current).length; i++) {
		// 	let symbol = Object.keys(symbolsToNames.current)[i];
		// 	let name = symbolsToNames.current[symbol];
		// 	if (name === symbolFromProps) {
		// 		return symbol;
		// 	}
		// }
		return symbol;
	};

	const desirializeTIRP = (tirp) => {
		const size = tirp['size'];
		const symbols = tirp['symbols'];
		const symbolsNames = tirp['symbols_names'];
		const relations = tirp['relations'];
		const supInstances_0 = tirp['build_supporting_instances_0'];
		const supInstances_1 = tirp['build_supporting_instances_1'];
		const existClass0 = tirp['exist_in_class0'];
		const existClass1 = tirp['exist_in_class1'];
		const numSupEnt_0 = tirp['num_supporting_entities_0'];
		const numSupEnt_1 = tirp['num_supporting_entities_1'];
		const meanHorSup_0 = tirp['mean_horizontal_support_0'];
		const meanHorSup_1 = tirp['mean_horizontal_support_1'];
		const verticalSupport_0 = tirp['vertical_support_0'];
		const verticalSupport_1 = tirp['vertical_support_1'];
		const meanDuration_0 = tirp['mean_duration_0'];
		const meanDuration_1 = tirp['mean_duration_1'];
		const occurences_0 = tirp['occurences_0'];
		const occurences_1 = tirp['occurences_1'];
		const mean_of_first_interval_0 = tirp['mean_of_first_interval_0'];
		const mean_of_first_interval_1 = tirp['mean_of_first_interval_1'];
		const mean_offset_from_first_symbol_0 = tirp['mean_offset_from_first_symbol_0'];
		const mean_offset_from_first_symbol_1 = tirp['mean_offset_from_first_symbol_1'];
		const supporting_entities_properties_0 = tirp['supporting_entities_properties_0'];
		const supporting_entities_properties_1 = tirp['supporting_entities_properties_1'];

		const newTirp = new TIRP(
			size,
			symbols,
			symbolsNames,
			relations,
			supInstances_0,
			supInstances_1,
			existClass0,
			existClass1,
			numSupEnt_0,
			numSupEnt_1,
			meanHorSup_0,
			meanHorSup_1,
			verticalSupport_0,
			verticalSupport_1,
			meanDuration_0,
			meanDuration_1,
			occurences_0,
			occurences_1,
			mean_of_first_interval_0,
			mean_of_first_interval_1,
			mean_offset_from_first_symbol_0,
			mean_offset_from_first_symbol_1,
			supporting_entities_properties_0,
			supporting_entities_properties_1
		);

		for (var i = 0; i < symbolsNames.length; i++) {
			symbolsToNames.current[symbols[i]] = symbolsNames[i];
		}
		return newTirp;
	};

	const compareArrays = (arr1, arr2) => {
		// compare lengths - can save a lot of time
		if (arr1.length !== arr2.length) return false;

		for (var i = 0, l = arr1.length; i < l; i++) {
			if (arr1[i] !== arr2[i]) return false;
		}

		return true;
	};

	const deserializeSymbolTirps = (serializedJson) => {
		return serializedJson;
	};

	const dserializeTirpsJson = (tirpsJsonData) => {
		Object.entries(tirpsJsonData).forEach(([tirpName, tirpJson]) =>{
			let symbols = tirpJson['symbols'];
			let symbolsNames = tirpJson['symbols_names'];
			symbols.forEach((symbol, index)=>{
				if (!symbolsToNames.current.hasOwnProperty(symbol)) {
					symbolsToNames.current[symbol] = symbolsNames[index];
				}
			})
		})
		return tirpsJsonData;
	};

	useEffect(() => {
		let url = `${window.base_url}/initialize_tali`;
		Axios.post(url, {
			params: {
				datasetName: sessionStorage['datasetReadyName'],
				visualization_id: sessionStorage.getItem('visualizationId'),
			},
		}).then((_) => {
			url = `${window.base_url}/tirpsJson`;
			Axios.get(url, {
				params: {
					datasetName: sessionStorage['datasetReadyName'],
					visualization_id: sessionStorage.getItem('visualizationId'),
				},
			}).then((tirpsJson) => {
					let tirpsJsonData = tirpsJson.data;
					setTirpsJson(dserializeTirpsJson(tirpsJsonData));
					setTirpsReady(true);
					
					url = `${window.base_url}/get_symbol_TIRPs`;
					Axios.get(url, {
						params: {
							datasetName: sessionStorage['datasetReadyName'],
							visualization_id: sessionStorage.getItem('visualizationId'),
						},
					}).then((symbolsTirpsData) => {
						let symbolsTirpsTemp = symbolsTirpsData.data;
						setSymbolsToTirps(deserializeSymbolTirps(symbolsTirpsTemp));

						url = `${window.base_url}/symbols_to_names`;
						Axios.get(url, {
							params: {
								datasetName: sessionStorage['datasetReadyName'],
								visualization_id: sessionStorage.getItem('visualizationId'),
							},
						}).then((symbolsNames) => {
								let symbolsToNamesJson = symbolsNames.data;
								symbolsToNames.current = symbolsToNamesJson
								setReadyToExplore(true)
							})
						});
			
				})
		})}, []);

	return (
		<div>
			{tirpsReady && readyToExplore ? (
				<ExploreTree
					focusSymbol={Object.keys(symbolsToNames.current)[0]}
					symbolsToNames={symbolsToNames.current}
					symbolTirpsJson={symbolsToTirps}
					type={"BTirps"}
					tirpsJson={tirpsJson}
				/>
			) : (
				<CircularProgress
					style={{ color: 'purple', marginLeft: '45%', marginTop: '20%', width: 150 }}
				/>
			)}
		</div>
	);
};

export default App;
