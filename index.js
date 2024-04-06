//  index .js
let userTab =document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
// let userContainer=document.querySelector("0")
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab=userTab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();
function  switchTab(newTab){
    if(oldTab!=newTab){
        oldTab.classList.remove("current-tab");
        newTab.classList.add("current-tab"); 
        oldTab=newTab;
         if(!searchForm.classList.contains("active")){
            searchForm.classList.add("active");
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
         }
         else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
         }

    }
    // else{
    //     getfromSessionStorage();
    // }

}
// userTab.addEventListener("click",switchTab(userTab));
// searchTab.addEventListener("click",switchTab(searchTab));
userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});
function  getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    //  const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        // function call to take the local coordinates
        // const coordinates = JSON.parse(localCoordinates);
        grantAccessContainer.classList.add("active");

    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
 async function fetchUserWeatherInfo(coordinates){
     const {lat, lon} = coordinates;
     loadingScreen.classList.add("active");
     grantAccessContainer.classList.remove("active");
     try{
        const respose=await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await respose.json();
        
          renderWeatherInfo(data);
     }
     catch(err){
         loadingScreen.classList.remove("active");
         console.log(err);
         alert("retry or check the connection ");
     }
 }
// async function fetchUserWeatherInfo(coordinates) {
//     const {lat, lon} = coordinates;
//     // make grantcontainer invisible
//     grantAccessContainer.classList.remove("active");
//     //make loader visible
//     loadingScreen.classList.add("active");

//     //API CALL
//     try {
//         const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//           );
//         const  data = await response.json();
//      console.log(data);
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         renderWeatherInfo(data);
//     }
//     catch(err) {
//         loadingScreen.classList.remove("active");
//         //HW
//         alert("Thsi is alert ")

//     }

// }

function renderWeatherInfo(wheatherinfo){
    const cityname=document.querySelector("[data-cityName]");
    cityname.innerText=wheatherinfo?.name;
    const  flag=document.querySelector("[data-countryflag]");
    flag.src=`https://flagcdn.com/144x108/${wheatherinfo?.sys?.country.toLowerCase()}.png`; //doubt 
    const temp=document.querySelector("[data-temp]");
    temp.innerText=`${wheatherinfo?.main?.temp} °C`;
    const humditiy=document.querySelector("[data-humidity]");
    humditiy.innerText=`${wheatherinfo?.main?.humidity} %`;
    const cloud=document.querySelector("[data-cloudy]");
    const wind=document.querySelector("[data-windy]");
    cloud.innerText=`${wheatherinfo?.clouds?.all} %`;
    wind.innerText=`${wheatherinfo?.wind?.speed} m/s`;
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    desc.innerText = wheatherinfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${wheatherinfo?.weather?.[0]?.icon}.png`;

    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    
}
// function renderWeatherInfo(weatherInfo) {
//     //fistly, we have to fethc the elements 

//     const cityName = document.querySelector("[data-cityName]");
//     const countryIcon = document.querySelector("[data-countryflag]");
//     const desc = document.querySelector("[data-weatherDesc]");
//     const weatherIcon = document.querySelector("[data-weatherIcon]");
//     const temp = document.querySelector("[data-temp]");
//     const windspeed = document.querySelector("[data-windy]");
//     const humid = document.querySelector("[data-humidity]");
//     const cloudiness = document.querySelector("[data-cloudy]");

//     //fetch values from weatherINfo object and put it UI elements
//     cityName.innerText = weatherInfo?.name;
//     countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//     desc.innerText = weatherInfo?.weather?.[0]?.description;
//     weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//     temp.innerText = weatherInfo?.main?.temp;
//     windspeed.innertext = weatherInfo?.wind?.speed;
//     humid.innertext = weatherInfo?.main?.humidity;
//     cloudiness.innerText = weatherInfo?.clouds?.all;


// }
let grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",() =>{
    getLocation();
})

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        // HW - show an alert for no gelolocation support available
        alert("geolocation not found");
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}
 let submitcity=document.querySelector("[data-submitcity]");
 const searchInput = document.querySelector("[data-searchInput]");
 
 submitcity.addEventListener("click", (event) => {
    
    event.preventDefault();
    fun1();
  })
  
  function fun1() {
    
    const searchInput = document.querySelector("[data-searchInput]");
    let cityName = searchInput.value;
    if (cityName === "") {
      alert("not able to run");
      // return ;
    } else {
      fetchSearchWeatherInfo(cityName);
    }
  }

// searchForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     let cityName = searchInput.value;

//     if(cityName === "")
//         return;
//     else 
//         fetchSearchWeatherInfo(cityName);
// })

 async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    try{
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data= await response.json();
        console.log(data);
        renderWeatherInfo(data);
    }
    catch(err){
        console.log(err); 
    //    console.log("error");
    }
   
 }

