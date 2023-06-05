import React,{useState, useEffect, useContext} from 'react';
import {FilteredValuesContext} from '../globalState';
import './filteredValues.css';
import * as Realm from 'realm-web';
import moment from 'moment';

export const FilteredValues=()=>{
	const [isUpdated,setIsUpdated]= React.useState(false);//check if all states have been updated
	const [filteredData,setFilteredData]= useState([]);//filteredata updated by data retrieved from databank
	
	const {projektState}=useContext(FilteredValuesContext);
	const [projekt, setprojekt]=projektState;
	const {unterprojektState}=useContext(FilteredValuesContext);
	const [unterprojekt, setUnterprojekt]=unterprojektState;
	const {palState}=useContext(FilteredValuesContext);
	const [pal, setPal]=palState;
	
	React.useEffect(()=>{
		//if all states have been updated, update isUpdated to true
		if( projekt && unterprojekt && pal){
			setIsUpdated(true)
		}
	},[projekt, unterprojekt,pal]);
	
	const getFilteredData= async ()=>{
		const app = new Realm.App({ id: "mypracticeapp-zwwer" });
		const credentials = Realm.Credentials.anonymous();
		try {
		  const user = await app.logIn(credentials);
		  const filteredDataVals= user.functions.filterData("Dekorunde","CB-GK","2023-04-18");
		  filteredDataVals.then(resp=>setFilteredData(resp));
		} catch(err) {
		  console.error("Failed to log in", err);
		}
		
	}
	
	
	return(
		<>
		{isUpdated?
			<div className='fv'>
				<p className='fvprojekt'>{projekt}</p>
				<span className='fvunterprojekt'>{unterprojekt} ></span>
				<span className='fvpal'>{moment(pal).format("YYYY-MM-DD")}</span>
			</div>
			:
			null
		}
		</>
	)
}

