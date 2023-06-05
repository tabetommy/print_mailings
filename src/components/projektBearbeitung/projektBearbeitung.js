import React,{useState, useEffect} from 'react';
import * as Realm from 'realm-web';
import './projektBearbeitung.css';
import moment from 'moment';


const ProjektBearbeitung=()=>{
	/*l
	1. Load the three varaibles first
	2. filter and update data state
	3. use Data state to display modal	
	*/
	// get all data before component mounts
	//const [data, setData]=useState([]);
	const [projekt, setProjekt]=useState("");
	const [unterProjekt, setUnterProjekt]=useState("");
	const [pal, setPal]=useState(undefined);
	
	//states to be updated
    const [prId, setPrId]=useState("");
	const [newProjekt, setNewProjekt]=useState("");
	const [newUnterProjekt, setNewUnterProjekt]=useState("");
	const [newPal, setNewPal]=useState("");
	const [newMedium, setNewMedium]=useState();
	//mongo credentials
	const app = new Realm.App({ id: "mypracticeapp-zwwer" });
	const credentials = Realm.Credentials.anonymous();

	
	
	// load data
	useEffect(()=>{
		if(projekt && unterProjekt && pal){
			const getFilteredData= async ()=>{
				// update states of fields using resp
				try {
				  const user = await app.logIn(credentials);
				  const convertedPal=moment(pal).format("YYYY-MM-DD")
				  const filteredDataVals= user.functions.filterData(projekt,unterProjekt,convertedPal);
				  filteredDataVals.then(resp=>{
					setPrId(resp[0]._id)
					setNewProjekt(resp[0].oberprojekt);
					setNewUnterProjekt(resp[0].unterProjekt);
					setNewPal(resp[0].pal);
					setNewMedium(resp[0].medium);
				  });
				} catch(err) {
				  console.error("Failed to log in", err);
				}
			}
			getFilteredData();
		}
	},[projekt,unterProjekt, pal])

	const handleMediumUpdate=(event,medium_index,version_index)=>{
		let neueMedium = [...newMedium];
		let version=neueMedium[medium_index].versionen[version_index]
		switch (event.target.name) {
			case 'medium':
			neueMedium[medium_index].bezeichnung = event.target.value;
			setNewMedium(neueMedium);
			break;
			case 'kommentar':
			neueMedium[medium_index].kommentar = event.target.value;
			setNewMedium(neueMedium);
			break;
			case 'gesamtmenge':
			neueMedium[medium_index].gesamtmenge = event.target.value;
			setNewMedium(neueMedium);
			break;
			case 'version':
			version.bezeichnung = event.target.value;
			setNewMedium(neueMedium);
			break;
			case 'menge':
			version.menge=parseInt(event.target.value, 10)
			setNewMedium(neueMedium);
			break;
			default:
			console.log("No change");
		}
	}


	
	const handleSubmit= async(event)=>{
		event.preventDefault();
			try {
				  const user = await app.logIn(credentials);
				  const convertedPal=moment(newPal).format("YYYY-MM-DD")
				  user.functions.updateData(prId.toString(),newProjekt,newUnterProjekt,convertedPal, newMedium);
				} catch(err) {
				  console.error("Failed to log in", err);
				}
	
	}

console.log(newMedium)
	return(
		<form>
			<div style={{display:'flex'}}>
				<div className="pb-projekt">
					<label htmlFor="projekt">Oberprojekt:</label>
					<input type="text" id="projekt" name="projekt" 
						value={projekt}
					onChange={(event)=>setProjekt(event.target.value)}
					/>
				</div>
				<div className="pb-unterprojekt">
					<label htmlFor="unterprojekt">Unterprojekt:</label>
					<input type="text" 
					id="unterprojekt" 
					name="unterprojekt"  
					value={unterProjekt}
					onChange={(event)=>setUnterProjekt(event.target.value)}
					/>
				</div>
				<div className="pb-pal">
					<label htmlFor="pals">Pals:</label>
					<input type="date" id="pals" name="pals"
					value={pal}
					onChange={(event)=>setPal(event.target.value)} 
					/>
				</div>
			</div>
			 <div>
			    {newMedium && <div className="pb">
					<div className="pb-projekt">
						<label htmlFor="projekt">Oberprojekt:</label>
						<input type="text" id="projekt" name="projekt" value={newProjekt} onChange={(event)=>setNewProjekt(event.target.value)} />
					</div>
					<div className="pb-unterprojekt">
						<label htmlFor="unterprojekt">Unterprojekt:</label>
						<input type="text" id="unterprojekt" name="unterprojekt" value={newUnterProjekt} onChange={(event)=>setNewUnterProjekt(event.target.value)}/>
					</div>
					<div className="pb-pal">
						<label htmlFor="pals">Pals:</label>
						<input type="date" id="pals" name="pals" value={newPal} onChange={(event)=>setNewPal(event.target.value)}/>
					</div>
					{/*newMedium.map((medium, medium_index)=>{
						return medium.versionen.map((version,version_index)=>{
							return(
								<div key={medium.medium_id}>
									<div className="pb-medium-zeich">
										<label htmlFor="unterprojekt">Medium:</label>
										<input type="text" id="medium" name="medium" value={medium.bezeichnung} onChange={(event)=>handleMediumUpdate(event, medium_index)}/>
									</div>
									<div key={version.version_id}>
										<div className="pb-medium-version">
											<label htmlFor="version">Version:</label>
											<input type="text" id="version" name="version" value={version.bezeichnung} 
											onChange={(event)=>handleMediumUpdate(event,medium_index,version_index)}/>
										</div>
										<div className="pb-medium-menge">
											<label htmlFor="menge">Menge:</label>
											<input type="number" id="menge" name="menge" value={version.menge} 
											onChange={(event)=>handleMediumUpdate(event,medium_index,version_index,event)}/>
										</div>
									</div>
									<div className="pb-medium-kommentar">
										<label htmlFor="kommentar">Kommentar:</label>
										<input type="text" id="kommentar" name="kommentar" value={medium.kommentar} onChange={(event)=>handleMediumUpdate(event, medium_index)}/>
									</div>
									<div className="pb-medium-gesamtmenge">
										<label htmlFor="gesamtmenge">Gesamtmenge:</label>
										<input type="number" id="gesamtmenge" name="gesamtmenge" value={medium.gesamtmenge} onChange={(event)=>handleMediumUpdate(event, medium_index)}/>
									</div>	
								</div>
							)
						})
					})*/}
					{newMedium.map((medium, medium_index)=>{
						return(
							<div key={medium.medium_id}>
									<div className="pb-medium-zeich">
										<label htmlFor="unterprojekt">Medium:</label>
										<input type="text" id="medium" name="medium" value={medium.bezeichnung} onChange={(event)=>handleMediumUpdate(event, medium_index)}/>
									</div>
									{
										medium.versionen.map((version,version_index)=>{
											return(
												<div key={version.version_id}>
													<div className="pb-medium-version">
														<label htmlFor="version">Version:</label>
														<input type="text" id="version" name="version" value={version.bezeichnung} 
														onChange={(event)=>handleMediumUpdate(event,medium_index,version_index)}/>
													</div>
													<div className="pb-medium-menge">
														<label htmlFor="menge">Menge:</label>
														<input type="number" id="menge" name="menge" value={version.menge} 
														onChange={(event)=>handleMediumUpdate(event,medium_index,version_index,event)}/>
													</div>
												</div>
											)
										})
									}
									<div className="pb-medium-kommentar">
										<label htmlFor="kommentar">Kommentar:</label>
										<input type="text" id="kommentar" name="kommentar" value={medium.kommentar} onChange={(event)=>handleMediumUpdate(event, medium_index)}/>
									</div>
									<div className="pb-medium-gesamtmenge">
										<label htmlFor="gesamtmenge">Gesamtmenge:</label>
										<input type="number" id="gesamtmenge" name="gesamtmenge" value={medium.gesamtmenge} onChange={(event)=>handleMediumUpdate(event, medium_index)}/>
									</div>	
							</div>
						)
					})}
					<button onClick={handleSubmit}>Speichern</button>
				</div>
				
					}
			</div>
			 	
		</form>
	)
}

export default ProjektBearbeitung;