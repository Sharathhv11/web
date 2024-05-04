//function that set current date on console
function currentDate() {
  const date = new Date();
  return date.toLocaleDateString().replaceAll("/", "-");
}

//function that set time and update it for every 1s
function setTimeDate() {
  return new Promise((resolve, reject) => {
    const date = document.getElementById("date");
    date.firstElementChild.innerHTML = currentDate();
    setInterval(() => {
      let currentTime = new Date();
      const hour = currentTime.toLocaleTimeString();
      const Update = hour.slice(0, 5) + " " + hour.slice(8);
      date.lastElementChild.innerHTML = Update;
    }, 100);
  });
}

function getWeather(city){
  return new Promise(async(resolve,rejects)=>{
    try{
      const api_key = "30d4741c779ba94c470ca1f63045390a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${api_key}`;
      const data  = await fetch(url);
      const jsond = await data.json();
      resolve(jsond)
    }catch(error){
      rejects(error)
    }
  })
}

function displayWeather(data){
  const tempratureData = data["main"];
  const celcius = (tempratureData["temp"] - 32) * 5 / 9;
  const weatherContainer = document.querySelector(".temp");
  weatherContainer.innerHTML=`<h1>${parseInt(celcius)}<sup style="color:black">°</sup>C </h1>`;

  const location = document.getElementById("location");
  const city = data["name"];
  const country = data["sys"]["country"];
  location.innerHTML=`
    <div>
      <img src="source/icons/map-pin.svg" alt="location">
    </div>
    <div>
      <span>${city}</span>
      <span>${country}</span>
    </div>
  `;
}
//main function
async function main() {
  const arr = ["source/raining.jpg"];
  setTimeDate();
  const inp = document.querySelector("input");
  const search = document.querySelector("button");
  search.addEventListener("click", async() => {
    let value = inp.value;
    if (value.trim() === "") {
      inp.value="";
      alert(`Empty sttring not accepted!!`);
    } else {
      value = value[0].toUpperCase() + value.slice(1);
      inp.value="";
      const data = await getWeather(value);
      displayWeather(data)
      // const tempratureData = data["main"];
      
    }
  });
}

main();
