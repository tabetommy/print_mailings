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
		const app = new Realm.App({ id: "mypracticeapp-zwwer" });
		const credentials = Realm.Credentials.anonymous();
		try {
		  const user = await app.logIn(credentials);
		  const getUnterProjektData= user.functions.getAllData();
		  getUnterProjektData.then(resp=>setData(resp));
		} catch(err) {
		  console.error("Failed to log in", err);
		}
		
	}
	
	useEffect(()=>{
		getData();
	},[])
	console.log(data)
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
		{<embed src= {data[0].versionen[0].path} width= "500" height= "375" type="application/pdf" />}
		</>
	)
}

