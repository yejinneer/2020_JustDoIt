const univtoDoForm = document.querySelector(".js-univtoDoForm"); //html에서 가져올때
const univtoDoInput = univtoDoForm.querySelector("input");         //querySelector사용
const univtoDoList = document.querySelector(".js-univtoDoList");

const univTODOS_LS='univtoDos';

let univtoDos = [];


function deleteunivToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    univtoDoList.removeChild(li);
    const cleanunivToDos = univtoDos.filter(function(univtoDo){
        return univtoDo.id !== parseInt(li.id); //parseInt로 문자 ->숫자로 만듬.
    });
    // filterFn 이 체크가 된 아이템들의 array를 주는것임.
    // li에 없는 id인 toDos를 체크해야 한다.
    univtoDos = cleanunivToDos;
    console.log(cleanunivToDos);
    saveunivToDos();
}

function saveunivToDos(){
    localStorage.setItem(univTODOS_LS, JSON.stringify(univtoDos));
    // JSON.stringfy 는 자바스크립트 object를 string으로 바꿔줌.
}

function paintunivToDo(text){
    const li = document.createElement("li"); //html에다가 생성해줄때 createElement
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = univtoDos.length+1;
    delBtn.innerText = "DONE";
    delBtn.style.backgroundColor= "#ffd571";
    delBtn.style.fontFamily = "'Song Myung', serif";
    delBtn.style.fontSize = "20px";
    delBtn.style.fontWeight ="bold";
    delBtn.style.color ="#34495e";
    delBtn.addEventListener("click", deleteunivToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    univtoDoList.appendChild(li);
    const univtoDoObj = {
        text : text,
        id: newId
    };
    univtoDos.push(univtoDoObj);
    saveunivToDos();
}

function handleunivSubmit(event){
    event.preventDefault();
    const currentValue = univtoDoInput.value;
    paintunivToDo(currentValue);
    univtoDoInput.value="";
}

function loadunivToDos(){
    const loadedunivToDos = localStorage.getItem(univTODOS_LS);
    if(loadedunivToDos !== null){   
        //각 요소를 json형태로 parse해서 저장해줄것임
        const parsedunivToDos = JSON.parse(loadedunivToDos);

        //forEach 로 array의 각 요소에 (함수)의 역할을 해줄 것임.
        parsedunivToDos.forEach(function(univtoDo){
            paintunivToDo(univtoDo.text);
        })
    }
}

function init(){
    loadunivToDos();
    univtoDoForm.addEventListener("submit", handleunivSubmit);
}

init();