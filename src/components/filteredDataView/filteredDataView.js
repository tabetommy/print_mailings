import * as React from 'react';
import * as Realm from 'realm-web';
import {FilteredValuesContext} from '../globalState';
import './filteredDataView.css';
import DownloadForOfflineRoundedIcon from '@mui/icons-material/DownloadForOfflineRounded';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';




export default function FilteredDataView({setData}) {
	
	//modal functions
	const [open, setOpen] = React.useState(false);
	const handleOpen = (url) => {
		setOpen(true);
		console.log(url)
	}
	const handleClose = () => setOpen(false);
	  
	//other functions
	//const [allData, setAllData]= React.useState([]);
	const [filteredData,setFilteredData]= React.useState([]);//filteredata updated by data retrieved from databank
	const [trackMedium, setTrackMedium]=React.useState([]);
	const [subData, setSubData]=React.useState([]);
	const [mediumSum, setMediumSum]=React.useState();
	const [numOfBroschüre, setNumOfBroschüre]=React.useState();
	const [numOfFlyer, setNumOfFlyer]=React.useState();
	const [numOfPosters, setNumOfPosters]=React.useState();
	const [numOfBrief, setNumOfBrief]=React.useState();
	const [chartData, setChartData]=React.useState([]);
	const [hoverEffect, setHoverEffect]=React.useState(true);
	
	const imageConRef=React.useRef(null);
	
	
	
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
		  const convertedPal=moment(pal).format("YYYY-MM-DD")
		  const filteredDataVals= user.functions.filterData(projekt,unterprojekt,convertedPal);
		  filteredDataVals.then(resp=>setFilteredData(resp));
		} catch(err) {
		  console.error("Failed to log in", err);
		}
		
	}
	
	//get date range to display pal for the last 2 months
	const filterDatabyPal=(data)=>{
		const fromDate = new Date().getTime() / 1000;
		const untilDate = new Date().setDate(new Date().getDate() - 30)/1000;
		let filteredPal=data.filter(data=>(new Date(data.pal).getTime() / 1000)<=  fromDate && (new Date(data.pal).getTime() / 1000)>=untilDate)
		setSubData(filteredPal);
	}
	
	
	// get all data before component mounts
	const getData= async ()=>{
		const app = new Realm.App({ id: "mypracticeapp-zwwer" });
		const credentials = Realm.Credentials.anonymous();
		try {
		  const user = await app.logIn(credentials);
		  const allData= user.functions.getAllData();
		  allData.then(resp=>{
			  setData(resp);
			  setFilteredData(resp);
			  filterDatabyPal(resp);
		  });
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
		let mediumArr=["Alle"];
		filteredData.map((data,i)=>{
			data.medium.map(medium=>{
				if(!mediumArr.includes(medium.bezeichnung)){
					mediumArr.push(medium.bezeichnung)	
				}
				//setTrackMedium(prevState=>[...prevState,medium.bezeichnung]);//track medium values to to limit button filter
				newSum+=Number(medium.gesamtmenge);//add the gesamtMenge of the different mediums
				//function to determine last medium to draw line.
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
				
			});
			setMediumSum(newSum);
			setNumOfBroschüre(broschüreSum);
			setNumOfFlyer(flyerSum);
			setNumOfPosters(posterSum);
			setNumOfBrief(briefSum);
			setTrackMedium(mediumArr);
			
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
	
	
	
	// reduce subData to pals and gesamtmenge sum
	let arr=[]
	React.useEffect(()=>{
		let result=subData.reduce(function(acc, v) {
		  acc[v.pal] = (acc[v.pal] || 0) + v.medium[0].gesamtmenge 
		  return acc
		}, {})
		Object.keys(result).map(key => {
			arr.push({name:key, Gesamtmenge:result[key]})
			setChartData(arr)
			
		})
	},[filteredData]);
	
	const CustomizedAxisTick =(props)=> {
	
		const { x, y, stroke, payload } =props;
	
		return (
		  <g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-20)">
			  {payload.value}
			</text>
		  </g>
		);
	  }
	
	/*
	styles for the image , to be changed when hover on versionen
	*/
	const styles = {
		  width:"30%",
		  position: "relative",
		  marginRight:"20px",
		  marginTop: "20px",
		  marginBottom: "16px",
		  boxShadow: "2px 2px 10px  #888888",
		  textAlign: "center",
		  transition: "all .5s ease-in-out",
	  };
	  
	  
	const handleMouseEnter=(medium, version)=>{
	   //let newVersion= version.slice(-3);
	   let filterImages = document.querySelectorAll('.image-con-imgs-con');
	   filterImages.forEach( element =>{
		   if(element.classList.contains(medium) && element.classList.contains(version)){
			  element.style.cssText=`width:30%;position:relative;margin: 20px 20px 16px 0;box-shadow:2px 2px 10px  #888888;text-align:center;text-align:center;transition: all .5s ease-in-out;transform: scale(1.1);`
		   }
	   });
		
		
	}
	
	const handleMouseLeave=(medium, version)=>{
		let filterImages = document.querySelectorAll('.image-con-imgs-con');
		   filterImages.forEach( element =>{
			   if(element.classList.contains(medium) && element.classList.contains(version)){
				   element.style.cssText=`width:30%;position:relative;margin: 20px 20px 16px 0;box-shadow:2px 2px 10px  #888888;text-align:center;transition: all .5s ease-in-out`
			   }
		   });	
	}
	
	
  return (
	  <div>
	  <div className="filtered-main">
		  <div className="image-con">
		  <div className="image-con-btns">
			{/*<button  onClick={()=>filterImages('Alle', 'all')} className="btn all alleBtn">Alle</button>*/}
			{
				trackMedium.map(medium=>{
					return(
						<button 
						  key={medium}
						  onClick={()=>filterImages(medium,medium.slice(0, 3))}
						  className={"btn " + medium.slice(0, 3)}
						  >
						  {medium}
						</button>
					)
				})
			}
			  {/*
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
			  */}
		  </div>
		  <div className="image-con-imgs">
			  {
				  filteredData.map(data=>{
					  return data.medium.map(medium=>{
						  return medium.versionen.map(version=>{
							  return (
								  <div className={"image-con-imgs-con Alle "+ medium.bezeichnung+ " "+ version.bezeichnung.replace(/\s+/g, "")} 
								  key={version.version_id}
								  style={styles}
								  >
									<img src={version.path.imageUrl} className="image"/>					
									<div className="anchor">
										<a href={version.path.pdfUrl} target="_blank">
											<DownloadForOfflineRoundedIcon style={{ color: '#2600F2',fontSize: 70 }}/>
										</a>
									</div>
									<p>{version.bezeichnung}</p>
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
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}}
								onMouseEnter={()=>handleMouseEnter(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))} 
								onMouseLeave={()=>handleMouseLeave(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))}
								>
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								med.bezeichnung==="Flyer" && i===(numOfFlyer-1)?
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}} 
								onMouseEnter={()=>handleMouseEnter(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))} 
								onMouseLeave={()=>handleMouseLeave(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))}
								>
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								med.bezeichnung==="Poster" && i===(numOfPosters-1)?
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}} 
								onMouseEnter={()=>handleMouseEnter(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))} 
								onMouseLeave={()=>handleMouseLeave(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))}
								>
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								med.bezeichnung==="Brief" && i===(numOfBrief-1)?
								<tr key={version.version_id} style={{borderBottom:'1px solid rgb(69, 37, 242)'}} 
								onMouseEnter={()=>handleMouseEnter(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))} 
								onMouseLeave={()=>handleMouseLeave(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))}
								>
									<td>{med.bezeichnung}</td>
									<td>{version.bezeichnung}</td>
									<td>{version.menge}</td>
								</tr>
								:
								<tr key={version.version_id}
								onMouseEnter={()=>handleMouseEnter(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))} 
								onMouseLeave={()=>handleMouseLeave(med.bezeichnung, version.bezeichnung.replace(/\s+/g, ""))}
								>
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
	  <div className="diagram">
		  {
		  chartData.length>0? <LineChart width={800} height={250} data={chartData}>
			  <CartesianGrid strokeDasharray="3 3" />
			  <XAxis dataKey="name" />
			  <YAxis />
			  <Tooltip />
			  <Legend verticalAlign="bottom" height={36}/>
			  <Line type="monotone" dataKey="Gesamtmenge" stroke="rgb(69, 37, 242)" />
			</LineChart>	
			:
			null
		  }
	  </div>
	  </div>
	  
  );
}




		
