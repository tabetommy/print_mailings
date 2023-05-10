import * as React from 'react';
import * as Realm from 'realm-web';
import {FilteredValuesContext} from '../globalState';
import './filteredDataView.css';
import Pdf from './Pdf';
//import PdfImage from './Pdf2Image';


	

export default function FilteredDataView() {
	
	const [filteredData,setFilteredData]= React.useState([]);//filteredata updated by data retrieved from databank
	const [filteredBymedium, setFilterByMedium]= React.useState({});
	const [mediumSumme, setMediumSumme]=React.useState()
	
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
	
	//add different versions in medium
	React.useEffect(()=>{
		let newSum=0;
		filteredData.forEach(data=>{
			newSum += Number(data.gesamtmenge)
		})
		setMediumSumme(newSum);
	},[filteredData])
	
	
	// filter the images from filtereddata state by medium name
	//var filterByMedium=[];
	/*const filterImages=(event)=>{
		event.preventDefault();
		filteredData.map(data=>{
			return data.medium.map(media=>{
				if (event.target.id===media.bezeichnung){
					setFilterByMedium(media)
				}
				
			})
		})
	}*/
	console.log(filteredBymedium);
  return (
	  <div className="filtered-main">
	  	<div className="image-con">
		  <div className="image-con-btns">
		  	<button id="Alle" >Alle</button>
		  	<button id= "Brochure" >Brochure</button>
		  	<button id= "Brief" >Brief</button>
		  	<button id= "Flyer" >Fyler</button>
		  	<button id= "Poster">Poster</button>
		  </div>
		  <div className="image-con-pdfs">
		  {filteredData.map((data,i)=>{
			   return data.medium.map((media)=>{
				   return media.versionen.map((version)=>{
					   return(
						   <Pdf pdfUrl={version.path.url} key={version.path.imageName}/>
					   )
				   })
			   })
		   })}
		  </div>
		</div>
		<div className="table-con">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</div>
	  	{/*<table className="filtered-vals-table">
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
			{filteredData.map((data)=>{
				return data.versionen.map((version,i)=>(
					<tr key={i}>
						<td>{data.medium}</td>
						<td>{version.version}</td>
						<td>{version.menge}</td>
					</tr>
				))
			})}
			{ filteredData.length >0?
				<tr>
					<td>Gesamtmenge</td>
					<td></td>
					<td>{mediumSumme}</td>
				</tr>:
				null
			}
		  </tbody>
	  	</table>*/}
	  </div>
	  
  );
}




		
