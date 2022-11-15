var apikey = "f1763cf643fe0d747c56ef23cd6856dd";
var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add-city");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvindex = document.querySelector("#uvindex");
var recentCities = document.querySelector("#city-list");

var cityList = $("#city-list");
var cities = [];

//Date formatting --- NEED TO USE MOMENT

//
init();

function init(){
    //Retrieving stored cities in local storage
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCities();
};



//Store cities
function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
};

//Render cities
function renderCities(){
    cityList.empty();

    for (var i = 0; i<cities.length; i++){
        var city=cities[i];

        var li = $("<li>").text(city);
        li.attr("id", "listC");
        li.attr("data-city", city);
        li.attr("class", "list-group-item");
        console.log(li);
        cityList.prepend(li);
    }
    if (!city){
        return
    }
    else {
        getWeather(city)
    };
};

//On form submit
$("#add-city").on("click", function(event){
    event.preventDefault();
    //Retrieves input
    var city = $("#city-input").val().trim();
    //If blank, returns
    if (city === " "){
        return;
    }
    //Adds input to city list
    cities.push(city);
    //Stores to localstorage
storeCities();
renderCities();
});

//Get weather
console.log(console.coord.lon)
function getWeather(cityName){
    var lon = console.coord.lon;
    var lat = console.coord.lat;
    var queryURL = "https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid="+apikey;
   

    //Clear content
    $("#today-weather").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        //Create table elements
        cityTitle = $("<h3>").text(response.name + " " + FormatDay());
        $("#today-weather").append(cityTitle);
        var TempToNum = parseInt((response.main.temp)*9/5 - 459);
        var cityTemp = $("<p>").text("Temperature: "+ TempToNum +" °F");
        $("#today-weather").append(cityTemp);
        var cityHum = $("<p>").text("Humidity: "+ response.main.humidity + " %");
        $("#today-weather").append(cityHum);
        var cityWind = $("<p>").text("Wind: "+ response.main.wind + " mph");
        $("#today-weather").append(cityWind);
        var cityUvi = $("<p>").text("UVI: "+ response.main.uvindex + " %");
        $("#today-weather").append(cityUvi);
        

        var queryURL2 = "https://api.openweathermap.org/data/3.0/onecall?lat="+{lat}+"&lon="+{lon}+"&exclude=minutely,hourly&appid="+{apikey}
        $.ajax({
            url:queryURL2,
            method:"GET"
        }).then(function(getuv){
            var cityUV = $("<span>").text(getuv.value);
            var cityUVp = $("<p>").text("UV Index: ");
            cityUVp.append(cityUV);
            $("#today-weather").append(cityUVp);
            console.log(typeof getuv.value);
            if(getuv.value > 0 && getuv.value <=2){
                cityUV.attr("class","green")
            }
            else if (getuv.value >2 && getuv.value <=5){
                cityUV.attr("class","yellow")
            }
            else if (getuv.value >5 && getuv.value <=7){
                cityUV.attr("class","orange")
            }
            else if (getuv.value >7 && getuv.value <=10){
                cityUV.attr("class","red")
            }
            else{
                cityUV.attr("class","purple")
            }
        });

        //Forecast
        var queryURL3 = "https://api.openweathermap.org/data/3.0/onecall?lat="+{lat}+"&lon="+{lon}+"&exclude=minutely,hourly&appid="+{apikey}
           
    })
}
///////
$(document).on("click", "#listC", function() {
    var thisCity = $(this).attr("data-city");
    getWeather(thisCity);
});