const toDoForm = document.querySelector(".js-bobtoDoForm"); //html에서 가져올때
const toDoInput = toDoForm.querySelector("input");         //querySelector사용
const toDoList = document.querySelector(".js-bobtoDoList");

const TODOS_LS='toDos';

let toDos = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //parseInt로 문자 ->숫자로 만듬.
    });
    // filterFn 이 체크가 된 아이템들의 array를 주는것임.
    // li에 없는 id인 toDos를 체크해야 한다.
    toDos = cleanToDos;
    console.log(cleanToDos);
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // JSON.stringfy 는 자바스크립트 object를 string으로 바꿔줌.
}

function paintToDo(text){
    const li = document.createElement("li"); //html에다가 생성해줄때 createElement
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerText = "DONE";
    delBtn.style.backgroundColor= "#ffd571";
    delBtn.style.fontFamily = "'Song Myung', serif";
    delBtn.style.fontSize = "20px";
    delBtn.style.fontWeight ="bold";
    delBtn.style.color ="#34495e";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){   
        //각 요소를 json형태로 parse해서 저장해줄것임
        const parsedToDos = JSON.parse(loadedToDos);

        //forEach 로 array의 각 요소에 (함수)의 역할을 해줄 것임.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();