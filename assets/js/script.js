var apikey = "f1763cf643fe0d747c56ef23cd6856dd";
var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#addcity");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvindex = document.querySelector("#uvindex");
var recentCities = document.querySelector("#city-list");

var cityList = document.querySelector("#citylist");
var cities = [];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position) {
  var lon = position.coord.longitude;
  var lat = position.coord.latitude;
}

var queryURL = function showPosition(position) {
  var lon = position.coord.longitude;
  var lat = position.coord.latitude;

  "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly&appid=" +
    apikey;
};

//
init();

function init() {}

//Store cities
function storeCities() {}

//Render cities
function renderCities() {}

//On form submit
$("#addcity").on("click", function (event) {
  event.preventDefault();
  //Retrieves input
  var city = $("#cityinput").val().trim();
  //If blank, returns
  if (city === " ") {
    return;
  }
  //Adds input to city list
  cities.push(city);
  //Stores to localstorage
  storeCities();
  renderCities();
});
