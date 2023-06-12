import React, { useState } from "react";
import { MdWaves } from 'react-icons/md';
import Modal from "../Component/Modal";
import { useNavigate } from "react-router-dom";
const Weather = () => {
    const [search, setsearch] = useState("")
    const [data, setdata] = useState({});
    const [displays, setdisplays] = useState(false);
    const [warning, setwarning] = useState(false);
    const [history, sethistory] = useState([]);
    const [showhistory, setshowhistory] = useState(false);

    const confirm = async () => {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f8debdc59254bffd5ca73d24ccdf578d`);
        const res = await resp.json();
        console.log(res)
        if (res.cod === 404) {
            setwarning(true);
            setdisplays(false)
        }
        else {
            setwarning(false)
            setdata(res);
            setdisplays(true);
            sethistory([...history, { name: search }]);
        }
    }

    const historychecker = async () => {
        if (history.length > 2) {
            setshowhistory(true);
        }
    }

    // console.log(history);
    const searchbar = (e) => {

        if (e.target.value === "") {
        }
        setsearch(e.target.value)
    }

    const emptybar = (e) => {
        if (e.target.value === "") {
            setwarning(false);
            setdisplays(false);
            historychecker();
        }
        else {
            setshowhistory(false);
        }
    }

    const sunrise=1679615303;
    const sunriseDate = new Date(sunrise * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString();


    const sunset=1679659227
    const sunriseDates = new Date(sunset * 1000);
    const sunriseTimes = sunriseDates.toLocaleTimeString();

    const temperatureKelvin = 290.91;
    const temperatureCelsius = temperatureKelvin - 273.15;
    const temingegree=Math.round(temperatureCelsius);


    const [showPopUp, setshowPopUp]=useState(false)
    const handelPopup=()=>{
     setshowPopUp(true)
    }
    const closeModel=()=>{setshowPopUp(false)}

    const navigate=useNavigate()

    const handeldragDrop=()=>{
        navigate("/Dragdrop")
    }
    
   
    return (
        <>
           <div className="card12">
            <h1 style={{ color: "blue" }}>Weather App</h1>
            <input type="text" onBlur={(e) => { searchbar(e) }} onChange={(e) => { emptybar(e) }} placeholder="Enter state Name"></input>
            <button onClick={confirm}>Search</button>
            {warning ? (<div id="danger">Enter a Valid City Name</div>) : null}
            {
                displays ? (
                    
                    <div className="card2">
                    <div id="display">
                     <p style={{float:"left", marginLeft:"20px"}}>{search}, {data.sys.country}.Weather</p>
                     <br></br>
                     <br></br>
                     <p style={{ marginLeft:"50px"}}>{temingegree}&deg; <MdWaves /></p>
                     <p style={{ marginLeft:"20px", width:"10px"}}>Haze</p>
                    </div>
                    
                    <div className="details"> Current Temperature : {data.main.temp} F</div>
                    <div className="details">Temperature Range: {data.main.temp_max} F to {data.main.temp_min} F </div>
                    <div className="details">Humidity : {data.main.humidity}  </div>
                    <span>SunRise: {sunriseTime} </span>
                    <div className="details">Pressure : {data.main.pressure}</div>
                    <span>Sunset: {sunriseTimes} </span>
                    </div>) : null
            }

            {showhistory ?
                <>
                    <div id="hist">
                        < div >Last 3 City Entries :</div>
                        {
                            history.reverse().slice(0, 3).map((value) => {
                                return (
                                    <p id="old-search">{value.name}</p>
                                )
                            })
                        }
                    </div>

                </> : null}
                </div>


                <button onClick={handelPopup} style={{marginTop:"300px", backgroundColor:"blue", color:"white", height:"50px"}}>Click for Modal</button>
                <button onClick={handeldragDrop} style={{marginTop:"300px", backgroundColor:"blue", color:"white", height:"50px"}}> Drag and Drop Interface</button>

                {
            showPopUp && <Modal closeModel={closeModel} />
             }

        </>
    )
}

export default Weather