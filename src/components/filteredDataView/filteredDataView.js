import * as React from 'react';
import * as Realm from 'realm-web';
import { useRef } from "react";
import {FilteredValuesContext} from '../globalState';
import './filteredDataView.css';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';


	

export default function FilteredDataView() {
	
	const [filteredData,setFilteredData]= React.useState([]);//filteredata updated by data retrieved from databank
	const [trackMedium, setTrackMedium]=React.useState(["Alle"]);
	const [mediumSum, setMediumSum]=React.useState();
	const [numOfBroschüre, setNumOfBroschüre]=React.useState();
	const [numOfFlyer, setNumOfFlyer]=React.useState();
	const [numOfPosters, setNumOfPosters]=React.useState();
	const [numOfBrief, setNumOfBrief]=React.useState();
	
	
	//states from global state using react context	
	const {projektState}=React.useContext(FilteredValuesContext);
	const [projekt, setprojekt]=projektState;
	const {unterprojektState}=React.useContext(FilteredValuesContext);
	const [unterprojekt, setUnterprojekt]=unterprojektState;
	const {palState}=React.useContext(FilteredValuesContext);
	const [pal, setPal]=palState;
	
	const getFilteredData= async ()=>{
		const app = new Realm.App({ id: "mypracticeapp-zwwer" });
		const credentials = Realm.Credentials.anonymous();
		try {
		  const user = await app.logIn(credentials);
		  const filteredDataVals= user.functions.filterData(projekt,unterprojekt,pal);
		  filteredDataVals.then(resp=>setFilteredData(resp));
		} catch(err) {
		  console.error("Failed to log in", err);
		}
		
	}
	
	// get all data before component mounts
	const getData= async ()=>{
		const app = new Realm.App({ id: "mypracticeapp-zwwer" });
		const credentials = Realm.Credentials.anonymous();
		try {
		  const user = await app.logIn(credentials);
		  const allData= user.functions.getAllData();
		  allData.then(resp=>setFilteredData(resp));
		} catch(err) {
		  console.error("Failed to log in", err);
		}
		
	}
	
	//get all data before component mounts dom
	React.useEffect(()=>{
		getData()
	},[])
	
	
	//run get query only when all filtr data are available
	React.useEffect(()=>{
		if( projekt && unterprojekt && pal){
			getFilteredData()
		}
	},[projekt,unterprojekt,pal])
	
	// key track of all medium descriptions(names) to filter images of medium present
	React.useEffect(()=>{
		let newSum=0;
		let broschüreSum=0;
		let flyerSum=0;
		let posterSum=0;
		let briefSum=0;
		filteredData.map(data=>{
			data.medium.map(medium=>{
				setTrackMedium(prevState=>[...prevState,medium.bezeichnung]);
				newSum+=Number(medium.gesamtmenge);//add the gesamtMenge of the different mediums
				switch (medium.bezeichnung) {
					case "Brochure":
					broschüreSum=medium.versionen.length;
					break;
					case "Flyer":
					flyerSum=medium.versionen.length;
					break;
					case "Poster":
					posterSum=medium.versionen.length;
					break;
					case "Brief":
					briefSum=medium.versionen.length;
					break;
					default:
					console.log("default")
				}
			})
			setMediumSum(newSum);
			setNumOfBroschüre(broschüreSum);
			setNumOfFlyer(flyerSum);
			setNumOfPosters(posterSum);
			setNumOfBrief(briefSum);
		})
	},[filteredData])
	
	
	
	// filter displayed image by clicked button argument
	const filterImages=(type, btnType)=>{
		//check all filter elements. Filter only if the clicked button is present in track medium, 
		if(trackMedium.includes(type)){
			let filterImages = document.querySelectorAll('.image-con-imgs-con');
			filterImages.forEach( element => element.classList.add('hidden') );
			let unFilterImages = document.querySelectorAll('.'+type);
			unFilterImages.forEach( element => element.classList.remove('hidden') );
			
		}
		//change button style onclick
		let filterBtns=document.querySelectorAll('.btn');
		filterBtns.forEach(element=>element.style.cssText=`background:#FFF ;color: rgb(69, 37, 242)`)
		let unFilterBtns = document.querySelectorAll('.'+btnType);
		unFilterBtns.forEach(element=>element.style.cssText=`background: rgb(69, 37, 242);color: #FFF`)	
			
	}
	
  return (
	  <div className="filtered-main">
	  	<div className="image-con">
		  <div className="image-con-btns">
		    <button  onClick={()=>filterImages('Alle', 'all')} className="btn all alleBtn">Alle</button>
		  	{
				  filteredData.map(data=>{
					  return data.medium.map(medium=>{
						  return (
							  <button 
							  key={medium.medium_id}
							  onClick={()=>filterImages(medium.bezeichnung,medium.bezeichnung.slice(0, 3))}
							  className={"btn " + medium.bezeichnung.slice(0, 3)}
							  >{medium.bezeichnung}</button>
						  )
					  })
				  })
			  }
		  	{/*<button  onClick={()=>filterImages('Alle', 'all')} className="btn all">Alle</button>
		  	<button  onClick={()=>filterImages('Brochure','bch')} className="btn bch">Brochure</button>
		  	<button  onClick={()=>filterImages('Brief', 'brf')} className="btn brf">Brief</button>
		  	<button  onClick={()=>filterImages('Flyer', 'flr')} className="btn flr">Fyler</button>
		  	<button  onClick={()=>filterImages('Poster', 'pst')} className="btn pst">Poster</button>*/}
		  </div>
		  <div className="image-con-imgs">
	  		{
		  		filteredData.map(data=>{
					  return data.medium.map(medium=>{
						  return medium.versionen.map(version=>{
							  return (
								  <div className={"image-con-imgs-con Alle "+ medium.bezeichnung} key={version.version_id}>
									<img src={version.path.imageUrl} className="image"/>
									<div className="anchor">
										<a href={version.path.pdfUrl} target="_blank">
											<DownloadForOfflineRoundedIcon style={{ color: '#2600F2',fontSize: 70 }}/>
										</a>
									</div>
								  </div>
							  )
						  })
					  })
				  })
	  		}
		  </div>
		</div>
		<div className="table-con">
			<table className="filtered-vals-table">
			  <thead>
				   { filteredData.length >0 ?
				  <tr>
					<th>Medium</th>
					<th>Versionierung</th>
					<th>Versandmenge</th>
				  </tr>:
				  null
				 }
			  </thead>
			  <tbody>
				{filteredData.map(data=>{
					return data.medium.map(med=>{
						return med.versionen.map((version,i)=>{
							return(
								med.bezeichnung==="Brochure" && i===(numOfBroschüre-1)?
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}}>
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								med.bezeichnung==="Flyer" && i===(numOfFlyer-1)?
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}} >
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								med.bezeichnung==="Poster" && i===(numOfPosters-1)?
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}} >
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								med.bezeichnung==="Brief" && i===(numOfBrief-1)?
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}} >
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								<tr key={version.version_id}>
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
							)
						})
					}
					)
				})}
				{ filteredData.length >0?
					<tr>
						<td>Gesamtmenge</td>
						<td></td>
						<td>{mediumSum}</td>
					</tr>:
					null
				}
			  </tbody>
			  </table>
		</div>
	  </div>
	  
  );
}




		
