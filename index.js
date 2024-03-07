async function getData() {
    var climateCity = document.querySelector("#search").value;
  
    var climate_API_Key = "5afbdb191732e7c2cecddb62cbe72358";

    var climateURL = `https://api.openweathermap.org/data/2.5/weather?q=${climateCity}&appid=${climate_API_Key}&units=metric`;
    var num = 7;
    var dailyWheaterURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${climateCity}&cnt=${num}&appid=${climate_API_Key}`;
    var mapURL = `https://maps.google.com/maps?q=${climateCity}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    var climateDailyURL = `https://api.openweathermap.org/data/2.5/forecast?q=${climateCity}&appid=${climate_API_Key}&units=metric`;
    document.querySelector("#gmap_canvas").style.display="block"
    try {
      let res = await fetch(climateURL);

      let data = await res.json();
      // console.log(data);

      displayClimateData(data);
      displayMapData(climateCity);

      let res1 = await fetch(climateDailyURL);

      let data1 = await res1.json();
      data1 = data1.list;
      var dataArray = [];
      for (i = 2; i < data1.length; i = i + 8) {
        dataArray.push(data1[i]);
      }
      console.log(dataArray);

      displayClimateDailyData(dataArray);
      // let res1 = await fetch("dailyWheaterURL");
      // let data1 = await res1.json();
      //  console.log(data1);
    } catch (err) {
      console.log("server is not");
    }
  }
  function displayMapData(climateCity) {
    document.querySelector(
      "#gmap_canvas"
    ).src = `https://maps.google.com/maps?q=${climateCity}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }
  function displayClimateData(elem) {
    document.querySelector("#wheaterData").innerHTML = "";
    var div = document.createElement("div");

    var p1 = document.createElement("p");
    p1.innerHTML = `City Name:-${elem.name}`;
    var p2 = document.createElement("p");
    p2.innerHTML = `Minimum Temperature:-${elem.main.temp_min}°C`;
    var p3 = document.createElement("p");
    p3.innerHTML = `Maximum Temperature:-${elem.main.temp_max}°C`;
    var p4 = document.createElement("p");
    p4.innerHTML = `Wind:-<ul><li>deg:${elem.wind.deg} degrees</li><li>gust:${elem.wind.gust} meter/sec</li><li>speed:${elem.wind.speed} meter/sec</li></ul>`;
    var p5 = document.createElement("p");
    var link = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;
    p5.innerHTML = `Clouds:-${elem.weather[0].description} <br> <img src=${link} width=50px >`;
    var p6 = document.createElement("p");
    p6.innerHTML = `Sunrise:-${new Date(
      elem.sys.sunrise * 1000
    ).toLocaleTimeString()}  <sub><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFHZcs7IrYk1qEit-dFItwqXyCYmUvAkakQPepOPtdsoZmsJRRFaa-oXqcNKFtEFGclo&usqp=CAU" height=22px width=40px style="border-radius: 20px;"/></sub>`;
    var p7 = document.createElement("p");
    p7.innerHTML = `Sunset:-${new Date(
      elem.sys.sunset * 1000
    ).toLocaleTimeString()}  <sub><img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/PG_SUNSET.png" width=40px height=22px style="border-radius: 20px;"/></sub>`;

    div.append(p1, p2, p3, p4, p5, p6, p7);
    document.querySelector("#wheaterData").append(div);
  }

  function displayClimateDailyData(data) {
    document.querySelector("#dailyWheater").innerHTML = "";
    data.map((elem) => {
      var div = document.createElement("div");

      var h5 = document.createElement("h5");
      h5.innerHTML = `${new Date(elem.dt * 1000).toLocaleDateString()}`;
      var p2 = document.createElement("p");
      p2.innerHTML = `${elem.main.temp_min}°C`;
      var p3 = document.createElement("p");
      p3.innerHTML = `${elem.main.temp_max}°C`;

      var p5 = document.createElement("p");
      var link = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;
      p5.innerHTML = `<img src=${link} width=50px >`;

      div.append(h5, p5, p3, p2);
      document.querySelector("#dailyWheater").append(div);
    });
  }