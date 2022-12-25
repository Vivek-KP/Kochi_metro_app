import logo from './metro.png';
import facebook from './facebook.png';
import twitter from './twitter.png';
import linkedin from './linkedin.png';
import youtube from './youtube.png';
import arrow from './arrow.png';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

var val;
function App() {
  

  const [stations,getStations] = useState('');
  useEffect(()=>{
    getStationDetails();
  },[]);

  const getStationDetails=()=>{
      axios.get('http://52.203.100.234:5010/files/stops.txt')
      .then((response)=>{
        const allStation = response.data
        getStations(allStation);
      })
      .catch(console.error("error"))
  }
  return (
    <Display stations = {stations}/>
    
  );
}

function Display(props){
  const [show,toggleshow] =useState('');
  const [show1,toggleshow1] =useState('');
  const [show2,toggleshow2] =useState('');
  const [showOrHide,ShowOrHideFunction] =useState('');
  useEffect(()=>{
    ShowOrHideFunction(false);
  },[]);



 const DisplayStations = (props) =>{
  const {stations} = props;

  
  if(stations.length>0){
    
    return(
      stations.map((station,index)=>{
        return(
          <>
          <div className='data_container1' onClick={()=>
          toggleshow(station)} >
                       <h4>{station.stop_name}</h4>
                       <hr></hr>
                       <div className='api_data'>
                        <div className='api_data_key'>
                          <p>Station id</p>
                          <p>Theme</p>
                          <p>Theme Discription</p>
                        </div>
                        <div className='api_data_value'>
                        <h5>{station.stop_id}</h5>
                          <h5>Theme</h5>
   
                          <h5></h5>
                        </div>
                       </div>
                    </div>
           </>
        )
      }
      
      )
    )
  }
  else{
    return (<h2>nothing to display</h2>)
  }
 }

const FareGenerator = (data3,data4)=>{
    axios.get('http://52.203.100.234:5010/files/fare_rules.txt')
    .then((response)=>{
      const allStation = response.data
      getFare(allStation,data3,data4);
    })
    .catch(console.error("error"))

    function getFare(allStation,data3,data4){
      var tdata = allStation.filter(allStation=>allStation.origin_id==data3 && allStation.destination_id==data4)
      axios.get('http://52.203.100.234:5010/files/fare_attributes.txt')
      .then((response)=>{
        const allStationFare = response.data
        getPrice(allStationFare);
      })
      .catch(console.error("error"))

      function getPrice(allStationFare){
        var price = allStationFare.filter(allStationFare=>allStationFare.fare_id==tdata[0].fare_id)
        var priceDetails=price[0].price
        toggleshow2(priceDetails)
      }
    }
    

}


 const DisplayStations1 = (props) =>{
  const {stations} = props;
  if(stations.length>0){
    return(
      stations.map((station,index)=>{
        return(
          <>
          <div className='data_container1' onClick={()=>
          {toggleshow1(station); FareGenerator(show.stop_id,station.stop_id);ShowOrHideFunction(true)}}>
                       <h4>{station.stop_name}</h4>
                       <hr></hr>
                       <div className='api_data'>
                        <div className='api_data_key'>
                          <p>Station id</p>
                          <p>Theme</p>
                          <p>Theme Discription</p>
                        </div>
                        <div className='api_data_value'>
                        <h5>{station.stop_id}</h5>
                          <h5>Theme</h5>
   
                          <h5></h5>
                        </div>
                       </div>
                    </div>
           </>
        )
      }
      
      )
    )
  }
  else{
    return (<h2>nothing to display</h2>)
  }
 }







 return(
    <div>
    <header>
    <div className="heading">
    <img className="logo_img" src={logo} alt='logo'/>
    <h1>Kochi Metro</h1>
    </div>
</header>


<div className="content">
        <div className="body_heading">
            <h2>Metro Station Details and Fare Calculation</h2>
            <p className="second_head">By selecting the departure and arrival stations in the below you will be able to see the ticket fare</p>
        </div>


        <div className="station">
            <div className="station_details">
                <div className="departure">
                  <h2>Select Departure Station</h2>
                  <div className='container'>

                  {DisplayStations(props)}

                  </div>

                </div>
                <div className="arrival">
                    <h2>Select Arrival Station</h2>
                    <div className='container'>
                    {DisplayStations1(props)}

                    </div>
                </div>
            </div>
        </div>
    </div>
   {showOrHide&& <h5 className='tripdetails'>Trip Details</h5>}
     {showOrHide&&<div className='station_details1'>
   

    <div className='display_container'>

    <div className='data_container'>

    <h4>{show.stop_name}</h4>
                       <div className='api_data'>
                        <div className='api_data_key'>
                          <p>Station id</p>
                          <p>Theme</p>
                          <p>Theme Discription</p>
                        </div>
                        <div className='api_data_value'>
                        <h5>{show.stop_id}</h5>
                          <h5>Theme</h5>
   
                          <h5></h5>
                        </div>
                       </div>
                       </div>
                       </div>
      <img className='arrowname' src={arrow} width='100px' height='100px'></img>
     <div className='display_container'>
    <div className='data_container'>
    <h4>{show1.stop_name}</h4>
                       <div className='api_data'>
                        <div className='api_data_key'>
                          <p>Station id</p>
                          <p>Theme</p>
                          <p>Theme Discription</p>
                        </div>
                        <div className='api_data_value'>
                        <h5>{show1.stop_id}</h5>
                          <h5>theme</h5>
   
                          <h5></h5>
                        </div>
                       </div>
                       </div>
                       </div>
   <div className='display_container'>
   <h2>Fare</h2>
   <div className='data_container'>

    <h3 className='fare'>RS {show2}/-</h3>
 </div>
   </div>
    </div>}
<footer>
            <div className="foot">
                <p>&copy; Copyright 2019 Kochi Metro Rail Ltd | All Right Reserved</p>
                <span ><a href="https://www.facebook.com/KochiMetroRail/"><img src={facebook}/></a>
                    <a href="https://twitter.com/MetroRailKochi/"><img src={twitter}/></a>
                    <a href="https://www.linkedin.com/company/metrorailkochi/"><img src={linkedin}/></a>
                    <a href="https://www.youtube.com/KochiMetroRail"><img src={youtube}/></a>
                  </span>
            </div>
        </footer>
</div>
  
 )
}


export default App;
