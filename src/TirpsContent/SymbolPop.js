import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

class SymbolPop extends Component {
	state = {
		selectedSymbol: '',
		redirect: false,
		currentTirp: '',
	};

	ToggleButtonSymbol = () => {
		const radios = Object.values(this.props.row._TIRP__symbols);
		return (
			<ToggleButtonGroup defaultValue={0} name='options' style={{ width: '100%' }}>
				{radios.map((radio, idx) => (
					<ToggleButton
						className={'bg-hugobot button-margin'}
						key={idx}
						type='radio'
						color='info'
						name='radio'
						onChange={(e) => this.chooseSymbol(radio)}
					>
						{radio}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		);
	};
	chooseSymbol = (name) => {
		this.state.selectedSymbol = name;
		this.state.redirect = true;
		this.forceUpdate();
	};

	render() {
		if (this.state.redirect) {
			sessionStorage.setItem('CurrentTirp', JSON.stringify(this.props.row));
			sessionStorage.setItem('ExploreSymbol', JSON.stringify(this.state.selectedSymbol));
			sessionStorage.setItem('type', JSON.stringify(this.props.type));
			return <Redirect to={`/TirpsApp/Tali/${this.props.type}`} />;
		}
		return (
			<Modal
				{...this.props}
				size='xl'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Please choose symbol to explore</Modal.Title>
				</Modal.Header>

				<Modal.Body>{this.ToggleButtonSymbol()}</Modal.Body>
			</Modal>
		);
	}
}

export default SymbolPop;
