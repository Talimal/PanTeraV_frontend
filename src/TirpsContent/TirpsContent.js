import React, { Component } from 'react';

import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';

import DatasetInfo from './DatasetInfo';
import States from './States';
import Entities from './Entities';
import TIRPs from './TIRPs';
import DiscriminativeTIRPs from './DiscriminativeTIRPs';
import TIRPsSearch from './TIRPsSearch';
import '../visualization.css';
import App from '../../Tali/NewProject/App';
import RawData from '../../../Content/Tali/NewProject/RawDataView/RawData';

/**
 * in this class you can see the content of the main navbar.
 * it has home, tutorial, Manage, register, log in, upload.
 */

class TirpsContent extends Component {
	render() {
		return (
			<Switch>
				<Route path={'/TirpsApp/DatasetInfo'}>
					<Container fluid>
						<DatasetInfo />
					</Container>
				</Route>
				<Route path={'/TirpsApp/States'}>
					<Container fluid>
						<States />
					</Container>
				</Route>
				<Route path={'/TirpsApp/Entities'}>
					<Container fluid>
						<Entities />
					</Container>
				</Route>
				<Route path={'/TirpsApp/TIRPs'}>
					<Container fluid>
						<TIRPs />
					</Container>
				</Route>
				<Route path={'/TirpsApp/DiscriminativeTIRPs'}>
					<Container fluid>
						<DiscriminativeTIRPs />
					</Container>
				</Route>
				<Route path={'/TirpsApp/TIRPsSearch'}>
					<Container fluid>
						<TIRPsSearch isPredictive={false} />
					</Container>
				</Route>
				<Route path={'/TirpsApp/PTIRPsSearch'}>
					<Container fluid>
						<TIRPsSearch isPredictive />
					</Container>
				</Route>
				<Route path={'/TirpsApp/Tali/RawData'}>
					<Container fluid>
						<RawData />
					</Container>
				</Route>
				<Route path={'/TirpsApp/Tali/BTirps'}>
					<Container fluid>
						<App type={'BTirps'} />
					</Container>
				</Route>
				<Route path={'/TirpsApp/Tali/BPTirps'}>
					<Container fluid>
						<App type={'BPTirps'} />
					</Container>
				</Route>
				<Redirect from={'/TirpsApp'} to={'/TirpsApp/DatasetInfo'} />
			</Switch>
		);
	}
}

export default TirpsContent;
