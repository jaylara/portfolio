$(function() {

    GetWeather();

    $("#open-weather form").submit(function(e) {
        e.preventDefault();
        GetWeather();
    });

});

function GetWeather() {
    $.ajax({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather',
        dataType: 'json',
        data: $("#open-weather form").serialize(),
        success: OnSuccess//, //code to run if request succeeds
        //error: OnError
    });
} // GetWeather()

function FormatTemperature(temp)
{
    console.log($("[name='units']").val());

}

function OnSuccess(resp) {
    var units = "&degF";
    $("#open-weather .city-name").html(resp.name);
    $("#open-weather .coor-lon").html(resp.coord.lon);
    $("#open-weather .coor-lat").html(resp.coord.lat);

    $("#open-weather .temperature").html(resp.main.temp+units);
    $("#open-weather .temp-min").html(resp.main.temp_min+units);
    $("#open-weather .temp-max").html(resp.main.temp_max+units);

    $("#open-weather .humidity").html(resp.main.humidity+"%"); //%
    $("#open-weather .pressure").html(resp.main.pressure+" hPa"); //hPa

    $("#open-weather .wind-speed").html(resp.wind.speed+" mph"); //miles/hour
    $("#open-weather .wind-deg").html(resp.wind.deg+units);
    $("#open-weather .clouds").html(resp.clouds.all+"%"); // %


    $("#open-weather .description").text(resp.weather[0].description); //add to css => text-transform: capitalize;
    $("#open-weather .weather-icon").attr("src",`http://openweathermap.org/img/w/${resp.weather[0].icon}.png`);
    //$(".weather-descr") resp.weather[0].description
    $("#open-weather .country-flag").attr("src",`img/flags/4x3/${resp.sys.country}.svg`);

}
