let category = "top";

function clicker(headingText) {
    document.querySelectorAll("aside > a").forEach(function(el)
    {
        el.classList.remove("selected");
    });

    document.querySelector(`aside > a.${headingText.toLowerCase()}`).classList.add("selected")

    let heading = document.querySelector('#newsList > h2');
    heading.innerText = headingText + " Stories";

    category = headingText.toLowerCase();
    fetcher();
}
async function getWeather()
{
    const iconElement = document.querySelector("#weatherIcon");
    const tempElement = document.querySelector("#temperature-value p");
    const descElement = document.querySelector("#weather-description p");
    const weather=await fetch(`https://api.openweathermap.org/data/2.5/weather?id=1269843&appid=ce179d9f2cf713b66e286ecc8631c542`);
    const weather_resp=await weather.json();
    const temp=Math.floor(weather_resp.main.temp-273.15);
    const description_weather=weather_resp.weather[0].main;
    const weather_icon=weather_resp.weather[0].icon;
    iconElement.innerHTML = `<img src="icons/${weather_icon}.png"/>`;
    descElement.innerHTML = description_weather;
    tempElement.innerHTML = `${temp}°<span>C</span>`;
    console.log(weather_resp);
}

getWeather()
async function fetcher()
{
    document.querySelector("#topStoriesContainer").innerHTML = "";

    const resp = await fetch(`https://hacker-news.firebaseio.com/v0/${category}stories.json`);
    const ids = await resp.json();
    let items = ids.slice(0, 20);
    console.log(items);
    for(let i = 0 ; i < 20 ; i++)
    {
        const itemData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${items[i]}.json`);
        const resp = await itemData.json();


        const inserter =
        `<a class="news-item" href="${resp.url}" target="blank" data-title="${resp.title}">` +
            `<h3 class="news-title">${resp.title}</h3>` +
            `<p class="news-byline">${resp.by}</p>` +
            `<p class="news-time">${resp.time}</p>` +
            `<p class="news-score">` +
                `<i class="fa fa-thumbs-up"></i>${resp.score}` +
            `</p>` +
        `</a>`;

        console.log(inserter)

        document.querySelector("#topStoriesContainer").insertAdjacentHTML("beforeend", inserter);
    }
}

function main()
{
    console.log("Hey");
}

fetcher();
main();

function topClicked(){
    clicker("Top");
}

function bestClicked(){
    clicker("Best");
}

function newClicked(){
    clicker("New");
}
