import React, { Component } from 'react';
import Chart from 'react-google-charts';
import { ButtonGroup, Card, ToggleButton } from 'react-bootstrap';
import service from './service.js';

class TIRPTimeLine extends Component {
	defaultColors = ['#ff6347', '#ee82ee', '#ffa500', '#6a5acd', '#7f2b47', '#7fffe6', '#ffff10'];
	columns = [
		{ type: "string", id: "President" },
		{ type: "date", id: "Start" },
		{ type: "date", id: "End" },
	  ];
	  
	rows = [
	["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
	["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
	["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)],
	];
	
	// data_google = [columns, ...rows];

	state = {
		classMode: 0,
	};

	

	computeColors() {
		const colorsFromSymbols = () =>
			this.symbols.map((symbol, idx) => {
				const colorsPerSymbol = {
					[this.props.prefixSymbol]: 'red',
					[this.props.nextSymbol]: 'green',
					[this.props.centerSymbol]: 'rgb(44, 64, 100)',
				};
				return colorsPerSymbol[symbol] || this.defaultColors[idx];
			});

		return this.props.colorIntervals ? colorsFromSymbols() : [];
	}

	timesToSymbols(times) {
		return times.map((time) => service.getDateForSymbol(time));
	}

	addDiffToDate(date, diff){
		const newDate = new Date(0);
		newDate.setMinutes(date.getMinutes() + diff);
		return newDate
	}

	computeDataset = (isDiscriminative, classMode) => {
		this.computeColors();
		let meanFirstSTI = this.props.tirp._TIRP__mean_of_first_interval;
		let intervals = [];
		for (let i = 0; i < this.props.tirp._TIRP__symbols.length; i++) {
			let symbolName = this.props.tirp._TIRP__symbols[i];
			let startSTI = this.props.tirp._TIRP__mean_offset_from_first_symbol[2*i];
			let endSTI = this.props.tirp._TIRP__mean_offset_from_first_symbol[2*i + 1];
			intervals.push([symbolName, startSTI+meanFirstSTI, endSTI+meanFirstSTI]);
		}
		const firstDate = new Date(intervals[0][1]);
		for (let i = 0; i < intervals.length; i++) {
			let interval = intervals[i];
			intervals[i] = [interval[0], this.addDiffToDate(firstDate, Math.round(interval[1])), this.addDiffToDate(firstDate, Math.round(interval[2]))];
		}

		return [
			[
				{ type: 'string', id: 'Name' },
				{ type: 'date', id: 'Start' },
				{ type: 'date', id: 'End' },
			],
			...intervals,
		];

	};

	render() {
		this.symbols = this.props.tirp._TIRP__symbols;
		const isDiscriminative = this.props.type_of_comp === 'disc';
		const existInClass1 = this.props.tirp._TIRP__exist_in_class1;
		const existInClass0 = this.props.tirp._TIRP__exist_in_class0;
		const classMode = !existInClass1 ? 0 : !existInClass0 ? 1 : this.state.classMode;
		const dataset = this.computeDataset(isDiscriminative, classMode);
		const colors = this.computeColors();
		const intervals = dataset.slice(1);
		const ticks = intervals.flatMap((interval) => interval.slice(2, 4));
		// const hasHours = ticks.find((tick) => tick.getHours() > 0);
		return (
			<div>
				<Card>
					<Card.Header className={'bg-hugobot'}>
						<Card.Text className={'text-hugobot text-hugoob-advanced'}>
							Mean Presentation
						</Card.Text>
					</Card.Header>
					<Card.Body>
						<Chart
							height={'200px'}
							chartType='Timeline'
							loader={<div>Loading Chart</div>}
							data={dataset}
							options={{
								timeline: {
									rowLabelStyle: {
										fontSize: 16,
										color: '#603913',
										groupByRowLabel: false,
										showBarLabels: false,
									},
								},
								colors: colors.length > 0 ? colors : null,
								hAxis: {
									ticks: { ...ticks },
									format: 'm:ss',
								},
							}}
						/>
						{/* {isDiscriminative && (
							<ButtonGroup
								toggle={true}
								style={{ display: 'block', marginLeft: '50%' }}
								size='lg'
							>
								<ToggleButton
									checked={classMode === 0}
									className={'btn-hugobot'}
									onClick={() => this.setState({ classMode: 0 })}
									type={'radio'}
									value={0}
									disabled={!existInClass0}
								>
									Class 0
								</ToggleButton>
								<ToggleButton
									checked={classMode === 1}
									className={'btn-hugobot'}
									onClick={() => this.setState({ classMode: 1 })}
									type={'radio'}
									value={1}
									disabled={!existInClass1}
								>
									Class 1
								</ToggleButton>
							</ButtonGroup> */}
						{/* )} */}
					</Card.Body>
				</Card>
			</div>
		);
	}
}
export default TIRPTimeLine;
