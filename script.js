const datacontainer = document.getElementById("data-container");
const input = document.getElementById("input");
const apikey = API_KEY;

  async function check() {

    if(input.value == "") {
      datacontainer.innerHTML = `<p class="text-nowrap mb-5 p-5">Please fill the form</p>`;
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}&units=metric`);
      const data = await response.json();

      
  if(data.cod !==200) {
    datacontainer.innerHTML = `<p class="text-nowrap mb-5 p-5">Please Write The Country</p>`;
    return;
    }

    // Timezone

  const displayTime = new Date(new Date().getTime() + (data.timezone * 1000) + (new Date().getTimezoneOffset() * 60000)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
   

    // WeatherApi Queries

    const weatherapi = {
      weather: data.weather[0].main,
      name: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      windspeed: data.wind.speed,
      temperature: data.main.temp,
    }


    // App Template with Queries

datacontainer.innerHTML = `

<div class="text-center mt-3">

<h1 class="text-xl text-center">${weatherapi.name}</h1>
<h2 class='text-sm text-center'>${weatherapi.country}<br> </h2>


    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="mx-auto" width="120" height='120'>

    <h1 class='text-4xl'>${weatherapi.temperature}°C</h1>
    <p>${weatherapi.weather} </p>
    
    
  <div class="grid grid-cols-3 gap-2 mt-10 mb-4">

    <div class="rounded-lg bars">
      <i class='bx bx-time bx-md text-yellow-300'></i>
       <p>${displayTime}</p>
</div>


<div class="rounded-lg bars">
    <i class='bx bx-water bx-md text-blue-400'></i> 
    <p>Humidity: ${weatherapi.humidity}</p>

</div>


<div class="rounded-lg bars">
     <i class='bx bx-wind bx-md text-blue-300'></i>
      <p>Wind: ${weatherapi.windspeed}</p>

</div>
  </div>

    </div>`;

    } catch (error) {
      document.write(error);
    }
 
}

window.addEventListener("keydown",(e)=>{
  if(e.key == "Enter"){
    check();
  }
});
