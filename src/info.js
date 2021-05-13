import { useEffect, useState } from "react";
import "./styles.css";



const Info = () =>{

    const [data, setdata] = useState([]);
    const [city, setcity] = useState(""); 
    const [country, setcountry] =useState("");
    const [wind, setwind] = useState(0);
    const [temp, setTemp] = useState(0);
    const [weather, setweather] = useState("");
    const [lang, setlang] = useState("en")
    const [traductor, setTraductor] = useState(0);
    const[grados, setgrados] = useState("C°")

    
    
    useEffect(() =>{

        navigator.geolocation.getCurrentPosition( async (result) => {
            let urlCity;
            const {latitude, longitude} = result.coords;
            let URL = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7b5d57fddc6a326f4160adf16a75948c&lang=${lang}`;
            const creatorUrl = await fetch(URL, {
            method: 'GET'
            })
            urlCity = creatorUrl.url.replace('localhost:3000/','')
            if(urlCity){
               setdata(urlCity)
               console.log(urlCity)
            }
        })

    },[lang])

    useEffect(() => {

         fetch(data)
        .then(finalData => finalData.json())
        .then(finalData => { 
            const { name, sys, weather, wind, main } = finalData
            setcity(name);
            setcountry(sys.country)
            setwind(wind.speed + "m/s")
            setTemp(main.temp)
            setweather(weather)


            
        })
    },[data])

    const PrintAllweather = () =>{

        if(weather){
            let icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
            let description = weather[0].description;
            return (
                <div>
                    {description}
                    <div>
                    <img src={icon} alt=""/> 
                    </div>
                </div>
           )
        }

    }

     const Temp=  () =>{
        const formule = 273.15
        let Gcelcios = temp - formule;
        let celcios =  Gcelcios.toFixed();
        if(!traductor){
            return  celcios
        }else if(traductor <= celcios*9/5 +32){
            return traductor
        }else{
            return celcios
        }
    }

    const ToFarenheigth = () =>{
        let Fahrenheit = Temp()*9/5+ 32
        return Fahrenheit
    }

    const pritG = () =>{
        let F = grados
        if( F === "C°"){
            return "°F"
        }
        else if( F ==="°F"){
            return"C°"
        }
    }

    const language = () =>{
        let idiom = lang
        if(idiom === "en"){
            return "es"
        }
        else if( idiom === "es"){
            return "en"
        }

    }


    if(city && country &&wind &&PrintAllweather()){
    return(
       <div className="container"> 
            <div className="row lang">
                <button className="second-button" onClick={()=>{setlang(language)}}>Language: {lang}</button>
            </div>
            <div className="row">
                <h1 className="text-black">WEATHER APP</h1>
            </div>
            <div className="row">
            <div className="col-5">
                <div className="card">
                    <h3>{city}/{country}</h3>
                    <div className="row">
                        <div className="col-12">
                            <PrintAllweather />
                            <div>Temp: <Temp/> {grados}</div>
                            <div>
                                <button className="primary-button" onClick={()=>{setTraductor(ToFarenheigth); setgrados(pritG)}}>
                                    <i className="fas fa-temperature-high"></i>
                                </button>
                            </div>
                            <img className="img" src="https://lh3.googleusercontent.com/proxy/OxceRADqgTaQPEjhQAOURKYES9HSiLq3WusEfhB2MXAL7AClFE2hWr1mFvTp0sDpEj-kJH0yn0qk7G-JOv6RNuIgFCGfvk365Ofs" alt=""/>  {wind}
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )}
    else{
        return null
    }
}

export default Info