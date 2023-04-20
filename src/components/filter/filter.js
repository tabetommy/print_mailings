import React from 'react';
import Projekt from '../projekt/projekt';
import Unterprojekt from '../unterprojekt/unterprojekt';
import Pal from '../pal/pal';
import {FilteredValues} from '../filteredValues/filteredValues';
import FilterView from '../filterView/filterView';
import './filter.css';
import {FilteredValuesProvider} from '../globalState';
import axios from 'axios';
//import HalbVersion from '../neuesProjekt/halbVersion';



const Filter=()=>{	
	return(
		<div className='filter-con'>
			<FilteredValuesProvider>
				<h1>Projekte auswählen</h1>
				<div className='filter-components'>
						<Projekt />
						<Unterprojekt />
						<Pal />
				</div>
				<FilteredValues />
				<FilterView />
			</FilteredValuesProvider>
		</div>
	)
}

export default Filter;