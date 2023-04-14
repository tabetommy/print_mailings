import React from 'react';
import Projekt from '../projekt/projekt';
import Unterprojekt from '../unterprojekt/unterprojekt';
import Pal from '../pal/pal';
import {FilteredValues} from '../filteredValues/filteredValues';
import './filter.css';
import {FilteredValuesProvider} from '../globalState';
import HalbVersion from '../neuesProjekt/halbVersion';



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
				<HalbVersion />
			</FilteredValuesProvider>
		</div>
	)
}

export default Filter;