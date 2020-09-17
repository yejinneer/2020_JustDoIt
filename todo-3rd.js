const weeklytoDoForm = document.querySelector(".js-weeklytoDoForm"); //html에서 가져올때
const weeklytoDoInput = weeklytoDoForm.querySelector("input");         //querySelector사용
const weeklytoDoList = document.querySelector(".js-weeklytoDoList");

const weeklyTODOS_LS='weeklytoDos';

let weeklytoDos = [];


function deleteweeklyToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    weeklytoDoList.removeChild(li);
    const cleanweeklyToDos = weeklytoDos.filter(function(weeklytoDo){
        return weeklytoDo.id !== parseInt(li.id); //parseInt로 문자 ->숫자로 만듬.
    });
    // filterFn 이 체크가 된 아이템들의 array를 주는것임.
    // li에 없는 id인 toDos를 체크해야 한다.
    weeklytoDos = cleanweeklyToDos;
    console.log(cleanweeklyToDos);
    saveweeklyToDos();
}

function saveweeklyToDos(){
    localStorage.setItem(weeklyTODOS_LS, JSON.stringify(weeklytoDos));
    // JSON.stringfy 는 자바스크립트 object를 string으로 바꿔줌.
}

function paintweeklyToDo(text){
    const li = document.createElement("li"); //html에다가 생성해줄때 createElement
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = weeklytoDos.length+1;
    delBtn.innerText = "CLEAR";
    //delBtn.style.backgroundColor= "#ffd571";
    delBtn.style.fontFamily = "'Song Myung', serif";
    delBtn.style.fontSize = "20px";
    delBtn.style.fontWeight ="bold";
    delBtn.style.color ="#810000";
    delBtn.addEventListener("click", deleteweeklyToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    weeklytoDoList.appendChild(li);
    const weeklytoDoObj = {
        text : text,
        id: newId
    };
    weeklytoDos.push(weeklytoDoObj);
    saveweeklyToDos();
}

function handleweeklySubmit(event){
    event.preventDefault();
    const currentweeklyValue = weeklytoDoInput.value;
    paintweeklyToDo(currentweeklyValue);
    weeklytoDoInput.value="";
}

function loadweeklyToDos(){
    const loadedweeklyToDos = localStorage.getItem(weeklyTODOS_LS);
    if(loadedweeklyToDos !== null){   
        //각 요소를 json형태로 parse해서 저장해줄것임
        const parsedweeklyToDos = JSON.parse(loadedweeklyToDos);

        //forEach 로 array의 각 요소에 (함수)의 역할을 해줄 것임.
        parsedweeklyToDos.forEach(function(weeklytoDo){
            paintweeklyToDo(weeklytoDo.text);
        })
    }
}

function init(){
    loadweeklyToDos();
    weeklytoDoForm.addEventListener("submit", handleweeklySubmit);
}

init();