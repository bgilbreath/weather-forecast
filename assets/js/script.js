var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvindex = document.querySelector("#uvindex");
var recentCities = document.querySelector("#city-list");

var cities = [];

//Date formatting --- NEED TO USE MOMENT
function FormatDay(date){
    var date= new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();

    var dayOutput = date.getFullYear
}

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
        getResponseWeather(city)
    };
};




