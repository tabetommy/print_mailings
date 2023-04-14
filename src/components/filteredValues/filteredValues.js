import React,{useState, useEffect, useContext} from 'react';
import {FilteredValuesContext} from '../globalState';
import './filteredValues.css';
import * as Realm from 'realm-web';

export const FilteredValues=()=>{
	const [isUpdated,setIsUpdated]= React.useState(false);//check if all states have been updated
	const [data,setData]= useState([]);
	
	const {projektState}=useContext(FilteredValuesContext);
	const [projekt, setprojekt]=projektState;
	const {unterprojektState}=useContext(FilteredValuesContext);
	const [unterprojekt, setUnterprojekt]=unterprojektState;
	const {palState}=useContext(FilteredValuesContext);
	const [pal, setPal]=palState;
	
	React.useEffect(()=>{
		//if all states have been updated, update isUpdated to true
		if( projekt && unterprojekt && pal){
			console.log("ffffff")
			setIsUpdated(true)
		}
	},[projekt, unterprojekt,pal]);
	
	const getData= async ()=>{
		const app = new Realm.App({ id: "PLACE YOUR APP ID" });
		const credentials = Realm.Credentials.anonymous();
		try {
		  const user = await app.logIn(credentials);
		  const getUnterProjektData= user.functions.getUnterProjektData();
		  getUnterProjektData.then(resp=>setData(resp));
		} catch(err) {
		  console.error("Failed to log in", err);
		}
		
	}
	
	useEffect(()=>{
		getData();
	},[])
	
	return(
		<>
		{isUpdated?
			<div className='fv'>
				<p className='fvprojekt'>{projekt}</p>
				<span className='fvunterprojekt'>{unterprojekt} ></span>
				<span className='fvpal'>{pal}</span>
			</div>
			:
			null
		}
		{data.length>0 && data.map((data)=><p key={data._id}>{data.bezeichnung}</p>)}
		</>
	)
}

