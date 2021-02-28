const APPKEY = "166a433c57516f51dfab1f7edaed8413";

/*
{"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":47.62,"feels_like":40.28,"temp_min":44.6,"temp_max":50,"pressure":1018,"humidity":66},"visibility":10000,"wind":{"speed":8.05,"deg":180},"clouds":{"all":40},"dt":1614471056,"sys":{"type":1,"id":4861,"country":"US","sunrise":1614428908,"sunset":1614469105},"timezone":-21600,"id":4887398,"name":"Chicago","cod":200}
*/
var HISTORY = [];

function searchWeather() {
  const searchValue = $("#search-value").val();
  HISTORY.push(searchValue);
  var GV_DATA = null;
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" +
    APPKEY +
    "&units=imperial";

  $.get({
    type: "GET",
    url: url,
    dataType: "json",
    success: function (data) {
      console.log(data);
      $("#humidity").text(data.main.humidity);
      $("#temperature").text(data.main.temp);
      $("#windSpeed").text(data.wind.speed);

      getForecast();
    },
  });
}
function getForecast() {
  const searchValue = $("#search-value").val();
  var url =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    searchValue +
    "&appid=" +
    APPKEY +
    "&units=imperial";
  $.get({
    type: "GET",
    url: url,
    dataType: "json",
    success: function (data) {
      console.log(data);

      for (var i = 0; i < 40; i += 8) {
        console.log(i);
        const dt = data.list[i].dt_txt;
        const temp = data.list[i].main.temp;
        const hum = data.list[i].main.humidity;
        const html = `Date: ${dt}<br/>Temp: ${temp}<br/>Humidity: ${hum}<hr/>`;
        const card = `
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
  <div class="card-header">Date: ${dt}</div>
  <div class="card-body">
    <h4 class="card-title">Temp: ${temp}</h4>
    <p class="card-text">Humidity: ${hum}</p>
  </div>
</div>
        `;
        // alert(html);
        $("#day" + (i / 8 + 1)).html(card);
      }
      /*
          $("#humidity").text(data.main.humidity);
          $("#temperature").text(data.main.temp);
          $("#windSpeed").text(data.wind.speed);
          */
      //  alert(data.main.humidity);
      // create history link for this search
    },
  });
}
