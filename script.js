// Suerte :)


startApp();

async function quoteSearch() {

    let response = await fetch("https://api.quotable.io/random/");

    let data = await response.json();

    return data;

    //console.log(data);

}
async function quoteDOMLoad() {

    const quote = await quoteSearch();

    const letter = quote.content;

    const autor = quote.author;

    document.querySelector("#quote").textContent = letter;

    document.querySelector(".author").textContent = autor;



    //console.log(letter);


}

async function getLocation() {

    let response = await fetch("https://api.freegeoip.app/json/?apikey=57c353b0-b0c8-11ec-9aba-57ff53195de6");

    let data = await response.json();

    // console.log(data)

    return data;

}

async function getTime(timezone) {

    //console.log(timezone);

    let response = await fetch("http://worldtimeapi.org/api/timezone/" + timezone);

    let data = await response.json();

    //console.log(data);

    return data;


}

let buttonExpand = document.querySelector(".expand");

buttonExpand.addEventListener("click",expand );

function expand () {


    let topWidgets = document.querySelector(".top-widgets");

    let details =  document.querySelector(".details");

    if (topWidgets.classList.contains("transform")) {

        topWidgets.classList.remove("transform");

        this.firstChild.nodeValue = "More";

        this.querySelector(".arrow").classList.add("rotate");


    }else{
    
        this.firstChild.nodeValue = "Less";

        //console.log(this);

        this.querySelector(".arrow").classList.remove("rotate");

        topWidgets.classList.add("transform");

    }
    if (details.classList.contains("transform")) {

        details.classList.remove("transform"); 
        
    }else{
    
        details.classList.add("transform");

    }

}
async function updateDOMTime(loc) {

    console.log("actualizo el DOM");

    const time = await getTime(loc.time_zone);

    let timeNow = new Date(time.datetime);

    let timeNowContainer = document.querySelector(".time-now");

    timeNowContainer.textContent = `${(timeNow.getHours() == 12) ? timeNow.getHours() : timeNow.getHours() % 12}:${(timeNow.getMinutes() < 10) ? "0" + timeNow.getMinutes() : timeNow.getMinutes()}`;

    let period = document.querySelector(".period");

    period.textContent = (timeNow.getHours() < 12) ? "AM" : "PM";

    let region = document.querySelector(".region");

    region.textContent = time.abbreviation;

    let greeting = document.querySelector(".currently__greeting");

    let iconGreeting = document.querySelector(".icon");

    let bg = document.querySelector(".background");

    if (timeNow.getHours() >= 5 && timeNow.getHours() <= 12) {

        bg.classList = "background day";

        iconGreeting.src = "./assets/desktop/icon-sun.svg"

        greeting.textContent = "Good Morning";


    } else if (timeNow.getHours() <= 18) {

        bg.classList = "background day";

        greeting.textContent = "Good Afternoon";

        iconGreeting.src = "./assets/desktop/icon-sun.svg"


    } else {

        bg.classList = "background night";

        greeting.textContent = "Good Evening";

        iconGreeting.src = "./assets/desktop/icon-moon.svg"

    }

    let infoTimezone = document.querySelector("#timezone");

    let infoYearDay = document.querySelector("#year-day");

    let infoWeekDay = document.querySelector("#week-day");

    let infoWeekNumber = document.querySelector("#week-number");

    infoTimezone.textContent = time.timezone;

    infoYearDay.textContent = time.day_of_year;

    infoWeekDay.textContent = time.day_of_week;

    infoWeekNumber.textContent = time.week_number;
}

async function startApp() {

    let buttonRefresh = document.querySelector("#refresh");

    buttonRefresh.addEventListener("click", quoteDOMLoad);

    quoteDOMLoad();

    const loc = await getLocation();

    //console.log(loc);

    await updateDOMTime(loc);

    setInterval(async() => {await updateDOMTime(loc) }, 30000);

    let currentLocation = document.querySelector(".currently__location");

    currentLocation.textContent = `in ${loc.region_name}, ${loc.country_code} `;


    //console.log(time);

    //console.log(loc);  

}







