const dateContainer = document.querySelector(".js-date"),
 dateTitle = dateContainer.querySelector(".date");

function getTime(){
    const date = new Date();
    const months = date.getMonth();
    const days = date.getUTCDay();
    dateTitle.innerText = `${months < 10 ? `0${months}` : months }.${days < 10 ? `0${days}` :days }`;
}

function init(){
    getTime();
    //setInterval(getTime, 1000); //1000 millisecond 마다 getTime 반복
}

init();