import * as React from 'react';
import * as Realm from 'realm-web';
import { Document} from 'react-pdf';
import {FilteredValuesContext} from '../globalState';
import './filterView.css';

	

export default function FilterView() {
	
	const [filteredData,setFilteredData]= React.useState([]);//filteredata updated by data retrieved from databank
	
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
	
	React.useEffect(()=>{
		if( projekt && unterprojekt && pal){
			getFilteredData()
		}
	},[projekt,unterprojekt,pal])

  return (
	  <div>
	  	<table className="filtered-vals-table">
		  <thead>
		  	<tr>
				<th>Medium</th>
				<th>Versionierung</th>
				<th>Versandmenge</th>
			  </tr>
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
		  </tbody>
	  	</table>
		<embed src={filteredData.length >0?filteredData[0].versionen[0].path:null} width="500" height="375" 
		 type="application/pdf" />
		 <Document file={"http://localhost:5000/image/Arbeitserlaubnis.pdf"}>
		 </Document>
	  </div>
	  
  );
}




		
