 const datacon = document.getElementById("data-container");
    const input = document.getElementById("input");

  async function check() {

    const nameinput = input.value;
    const apikey = '79da903b31849563d7d5d4747367d684';
    

    // CHANGE: 'forecast' becomes 'current'
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameinput}&appid=${apikey}&units=metric`);
    
    const data = await response.json();

    const displayTime = new Date(new Date().getTime() + (data.timezone * 1000) + (new Date().getTimezoneOffset() * 60000)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

datacon.innerHTML = `<html>

<div class="w-[240px] text-center mt-10 bg-white text-black rounded-lg mx-7">

    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="mx-14" width="120" height='120'>

    <p class="mt-4">Humidity: ${data.main.humidity}</p>
  
    <h1 class='text-4xl'>${data.main.temp}°C</h1>

    <p> ${data.weather[0].main}</p>
    

    <hr class="mt-2 mx-[19%]" style="border: solid 1px gray;" width="150px;">

    <div class="w-[240px] pb-5 pt-1 text-center text-black rounded-lg mt-1">

 <h2 class='text-sm'>${data.sys.country} ${data.name}</h2>

   <p> ${displayTime}</p>


</div>

    </div>
</html>
    

`;

 
}