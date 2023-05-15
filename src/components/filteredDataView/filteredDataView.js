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
	
	//display filtered values or not
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
		filteredData.map(data=>{
			data.medium.map(medium=>{
				setTrackMedium(prevState=>[...prevState,medium.bezeichnung]);
				newSum+=Number(medium.gesamtmenge);//add the gesamtMenge of the different mediums
				if(medium.bezeichnung==="Brochure"){//get number verions whose medium is brochure
					broschüreSum=medium.versionen.length
				}
				if(medium.bezeichnung==="Flyer"){//get number verions whose medium is flyer
					flyerSum=medium.versionen.length
				}
			})
			setMediumSum(newSum);
			setNumOfBroschüre(broschüreSum);
			setNumOfFlyer(flyerSum);
		})
	},[filteredData])
	
	// filter displayed image by clicked button argument
	const filterImages=(type)=>{
		//check all filter elements. if 
		if(trackMedium.includes(type)){
			
			let filterImages = document.querySelectorAll('.image-con-imgs-con');
			filterImages.forEach( element => element.classList.add('hidden') );
			let unFilterImages = document.querySelectorAll('.'+type);
			unFilterImages.forEach( element => element.classList.remove('hidden') );
			/*let selectedBtn = document.querySelectorAll('.btn');
			selectedBtn.forEach( element => element?element.classList.add('clicked-btn') );*/
			
		}
		
	}
	
  return (
	  <div className="filtered-main">
	  	<div className="image-con">
		  <div className="image-con-btns">
		  	<button  onClick={()=>filterImages('Alle')} className="btn">Alle</button>
		  	<button  onClick={()=>filterImages('Brochure')} className="btn">Brochure</button>
		  	<button  onClick={()=>filterImages('Brief')} className="btn">Brief</button>
		  	<button  onClick={()=>filterImages('Flyer')} className="btn">Fyler</button>
		  	<button  onClick={()=>filterImages('Poster')} className="btn">Poster</button>
		  </div>
		  <div className="image-con-imgs">
	  		{
		  		filteredData.map(data=>{
					  return data.medium.map(medium=>{
						  return medium.versionen.map(version=>{
							  return (
								  <div className={"image-con-imgs-con Alle "+ medium.bezeichnung} key={version.path.name}>
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




		
