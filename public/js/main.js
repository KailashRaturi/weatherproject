const cityName= document.getElementById('cityName');
const submitBtn=document.getElementById('submitBtn');
const city_name= document.getElementById('city_name');



const temp_state= document.getElementById('temp_status');
const temp_real_val=document.getElementById('temp_real_val');

const datahide =document.querySelector('.middle_layer');


//getting date and time from system
let day = document.getElementById('day');
let today_date =document.getElementById('today_date');
const  weekday=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

    const currentTime = new Date();
    const dates= currentTime.getDate();
    const month = currentTime.getMonth();
    const years = currentTime.getFullYear();
    const days = weekday[currentTime.getDay()];
    const fullday =`${dates}:${month}:${years}`;
    day.innerText = days;
    today_date.innerText=fullday;

const getinfo= async(event)=>{
    event.preventDefault();
    let cityname = cityName.value;

    if(cityname ==" "){
        city_name.innerText ="Please! Write a City Name..";
        datahide.classList.add('data_hide');
    }
    else{
        try{
        let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=b3cfb739ccef70317676f3a93cc62131`;
        const response=await fetch(url);
        const data= await response.json();
        const arrData =[data];
        
        city_name.innerText= `${arrData[0].name},${arrData[0].sys.country}`;

        //converting fern to cels
        const value=Math.round((arrData[0].main.temp-32)/9);
        temp_real_val.innerText=value;

        const tempmod= arrData[0].weather[0].main;
        if (tempmod == "Clear"){
            temp_state.innerHTML=`<i class="fa-solid fa-sun fa-spin" style="color: #FFD43B;"></i>`;
        }else if (tempmod == "Clouds"){
            temp_state.innerHTML=`<i class="fa-solid fa-cloud fa-beat fa-sm" style="color: #74C0FC;"></i>`;
        }else if (tempmod == "Rain"){
            temp_state.innerHTML=`<i class="fa-solid fa-cloud-showers-water fa-bounce" style="color: #808080;"></i>`;
        }else if (tempmod == "Thunder"){
            temp_state.innerHTML=`<i class="fa-solid fa-cloud-bolt fa-shake" style="color: #99a1ad;"></i>`;
        }else if (tempmod == "Haze"){
            temp_state.innerHTML=`<i class="fa-solid fa-smog fa-fade" style="color: #737373;"></i>`;
        }else if (tempmod == "Mist"){
            temp_state.innerHTML=`<i class="fa-solid fa-droplet fa-bounce" style="color: #74C0FC;"></i>`;
        }

        else{
            temp_state.innerHTML=`<i class="fa-solid fa-sun fa-spin" style="color: #FFD43B;"></i>`;
        }
        datahide.classList.remove('data_hide');

        }catch{
           city_name.innerText ="Please! Enter your City Name..";
           datahide.classList.add('data_hide');
        }
    }


}

submitBtn.addEventListener('click',getinfo);