import React, { useState, createContext} from 'react';
import FilteredValues from './filteredValues/filteredValues';

export const FilteredValuesContext=createContext();

export const FilteredValuesProvider= props =>{
	const [projekt, setProjekt]= React.useState(null);
	const [unterprojekt, setUnterprojekt]= React.useState(null);
	const [pal, setPal]= React.useState(null);
	
	return(
		<FilteredValuesContext.Provider 
		value={{
			projektState:[projekt, setProjekt],
			unterprojektState:[unterprojekt,setUnterprojekt],
			palState:[pal,setPal]
		}}>
			{props.children}
		</FilteredValuesContext.Provider>
	)
}
