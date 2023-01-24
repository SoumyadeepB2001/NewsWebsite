var input = document.querySelector('.city');
var unit = document.querySelector('.unit');
var token = config.weather;

var city_name = document.querySelector('.city_name');
var coord = document.querySelector('.coord');
var temp = document.querySelector('.temp');
var min_temp = document.querySelector('.min_temp');
var max_temp = document.querySelector('.max_temp');
var humidity = document.querySelector('.humidity');
var pressure = document.querySelector('.pressure');
var real_feel = document.querySelector('.real_feel');
var desc = document.querySelector('.desc');
var wind_speed = document.querySelector('.wind_speed');
var clouds = document.querySelector('.clouds');
var visibility = document.querySelector('.visibility');
var iconImg = document.getElementById('icon');

var button = document.querySelector('.submit');

var hourly = document.querySelector('.H1');
var hourlyData = document.querySelector('.HourlyData');
var daily = document.querySelector('.D1');
var dailyData = document.querySelector('.DailyData');
var lat = 0;
var lon = 0;

button.addEventListener('click', function (name) {
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + token + '&units=' + unit.value)
		.then(response => response.json())
		.then(data => {
			//console.log(data);
			city_name.innerHTML = data['name'] + ", " + data['sys']['country'];
			desc.innerHTML = "Description: " + data['weather'][0]['description'];
			coord.innerHTML = "Longitude: " + data['coord']['lon'] + " Latitude: " + data['coord']['lat'];
			lat = data['coord']['lat'];
			lon = data['coord']['lon'];
			humidity.innerHTML = "Humidity: " + data['main']['humidity'] + "%";
			pressure.innerHTML = "Pressure: " + data['main']['pressure'] + " hPa";
			clouds.innerHTML = "Cloudiness: " + data['clouds']['all'] + "%";
			visibility.innerHTML = "Visibility: " + data['visibility'] + " metres";
			iconImg.src = "http://openweathermap.org/img/wn/" + data['weather'][0]['icon'] + ".png";
			document.getElementById('icon').height = "76";
			document.getElementById('icon').width = "76";

			if (unit.value == 'metric') {
				temp.innerHTML = "Temperature: " + data['main']['temp'] + "°C";
				min_temp.innerHTML = "Minimum temperature: " + data['main']['temp_min'] + "°C";
				max_temp.innerHTML = "Maximum temperature: " + data['main']['temp_max'] + "°C";
				real_feel.innerHTML = "Real feel: " + data['main']['feels_like'] + "°C";
				wind_speed.innerHTML = "Wind speed: " + data['wind']['speed'] + " meter/sec";
			} else {
				temp.innerHTML = "Temperature: " + data['main']['temp'] + "°F";
				min_temp.innerHTML = "Minimum temperature: " + data['main']['temp_min'] + "°F";
				max_temp.innerHTML = "Maximum temperature: " + data['main']['temp_max'] + "°F";
				real_feel.innerHTML = "Real feel: " + data['main']['feels_like'] + "°F";
				wind_speed.innerHTML = "Wind speed: " + data['wind']['speed'] + " miles/hour";
			}
		})

		.catch(err => alert("Wrong Input!"));

	fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current,minutely' + '&appid=' + token + '&units=' + unit.value)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			var code = "";
			hourly.innerHTML = `<h1>Hourly Data For The Next 24 Hours</h1><br>`;
			if (unit.value == 'metric') {
				for (var i = 0; i < 24; i++)
					code += `After ${i+1}    Hour(s): Temperature: ${data['hourly'][i]['temp']}°C Humidity: ${data['hourly'][i]['humidity']}% Pressure: ${data['hourly'][i]['humidity']}hPa Wind Speed: ${data['hourly'][i]['wind_speed']} Cloudiness: ${data['hourly'][i]['clouds']}% Visibility: ${data['hourly'][i]['visibility']} metres<br>`;

			} else {
				for (var i = 0; i < 24; i++)
					code += `After ${i+1}    Hour(s): Temperature: ${data['hourly'][i]['temp']}°F Humidity: ${data['hourly'][i]['humidity']}% Pressure: ${data['hourly'][i]['humidity']}hPa Wind Speed: ${data['hourly'][i]['wind_speed']} Cloudiness: ${data['hourly'][i]['clouds']}% Visibility: ${data['hourly'][i]['visibility']} metres<br>`;

			}
			hourlyData.innerHTML = code;
			code = "";

			daily.innerHTML = `<h1>Daily Data For The Next 7 Days</h1><br>`;

			if (unit.value == 'metric') {
				for (var i = 0; i < 7; i++) {
					code += `After ${i+1} Day(s): <br>
					Maximum Temperature: ${data['daily'][i]['temp']['max']}°C	Minimum Temperature: ${data['daily'][i]['temp']['min']}°C<br>
					Description: ${data['daily'][i]['weather'][0]['description']}<br>`;
				}
			} else {
				for (var i = 0; i < 7; i++) {
					code += `After ${i+1} Day(s): <br>
					Maximum Temperature: ${data['daily'][i]['temp']['max']}°F	Minimum Temperature: ${data['daily'][i]['temp']['min']}°F<br>
					Description: ${data['daily'][i]['weather'][0]['description']}<br>`;
				}
			}
			dailyData.innerHTML = code;
			code = "";
		})
		.catch(err => alert(err));
	input.value = "";
})