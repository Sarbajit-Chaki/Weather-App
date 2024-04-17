const apiKey = "e49b34cd6bfdd4aca23b12c581b469f3d"
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric`
let response

async function getData(cityName){
    let a = await fetch(apiURL + `&q=${cityName}`)
    response = await a.json()

    // console.log(response)

    await setWeather()
}

async function setWeather(){
    if(response.cod == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".section").style.display = "none"
    }
    else
    { 
        //Update temprature from the data
        document.querySelector(".temp").innerHTML = `${Math.ceil(response.main.temp)}°C`;
        //Update location from the data
        document.querySelector(".location").innerHTML =  response.name;
        //Update humidity from the data
        document.querySelector(".humidity-info").firstElementChild.innerHTML = `${response.main.humidity} %`;
        //Update wind from the data
        document.querySelector(".wind-info").firstElementChild.innerHTML = `${Math.ceil(response.wind.speed * 3.6)} km/h`;
    
    

        //Update image of weather
        if(response.weather[0].main == "Clear"){
            document.querySelector(".weather-sign>img").src = "assets/images/clear.png"
        }
        else if(response.weather[0].main == "Clouds"){
            document.querySelector(".weather-sign>img").src = "assets/images/clouds.png"
        }
        else if(response.weather[0].main == "Drizzle"){
            document.querySelector(".weather-sign>img").src = "assets/images/drizzle.png"
        }
        else if(response.weather[0].main == "Rain"){
            document.querySelector(".weather-sign>img").src = "assets/images/rain.png"
        }
        else if(response.weather[0].main == "Snow"){
            document.querySelector(".weather-sign>img").src = "assets/images/snow.png"
        }
        else if(response.weather[0].main == "Mist" || response.weather[0].main == "Haze" || response.weather[0].main == "Smoke"){
            document.querySelector(".weather-sign>img").src = "assets/images/mist.png"
        }
        else{ //if the weather sign is not in files then set it
            document.querySelector(".weather-sign>img").src = "assets/images/mist.png"
        }
    

        
        //Show the weather card
        document.querySelector(".error").style.display = "none"
        document.querySelector(".section").style.display = "block"
    }
}

async function main(){

    //*Try to Accees the Geo Location of the user
    window.addEventListener("load",()=>{
        navigator.geolocation.getCurrentPosition(async (position)=>{  //Permision Allowed
            // console.log(position)
            //Try to access weather info by lat & long
            let a = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`)
            response = await a.json()
            // console.log(response)
            await setWeather()

        },()=>{   //Permission Denied
            console.log("Access Denied by user")
        })
    })


    //Add an event listener for search 
    document.querySelector(".search").addEventListener("click",async ()=>{
        let loc = document.querySelector(".header>input")
        await getData(loc.value)
    })


    //Add an event listener for input field
    document.querySelector(".header>input").addEventListener("keyup",async (e)=>{
        if(e.key == "Enter"){
            let loc = document.querySelector(".header>input")
            await getData(loc.value)
        }
    })
    

    // await getData("jalpaiguri")
}

main()