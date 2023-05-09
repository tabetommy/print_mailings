import React from 'react';
import Projekt from '../projekt/projekt';
import Unterprojekt from '../unterprojekt/unterprojekt';
import Pal from '../pal/pal';
import {FilteredValues} from '../filteredValues/filteredValues';
import FilteredDataView from '../filteredDataView/filteredDataView';
import './main.css';
import {FilteredValuesProvider} from '../globalState';
import axios from 'axios';
//import HalbVersion from '../neuesProjekt/halbVersion';



const MainComponent=()=>{	
	return(
		<div className='main-container'>
			<FilteredValuesProvider>
				<h1>Projekte auswählen</h1>
				<div className='main-components'>
						<Projekt />
						<Unterprojekt />
						<Pal />
				</div>
				<FilteredValues />
				<FilteredDataView />
			</FilteredValuesProvider>
		</div>
	)
}

export default MainComponent;