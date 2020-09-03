const clockContainer = document.querySelector(".js-clock"),
 clockTitle = clockContainer.querySelector(".clock");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours }:${minutes < 10 ? `0${minutes}` : minutes }:${seconds < 10 ? `0${seconds}`: seconds
    }`;
    
}

function init(){
    getTime();
    setInterval(getTime, 1000); //1000 millisecond 마다 getTime 반복
}

init();