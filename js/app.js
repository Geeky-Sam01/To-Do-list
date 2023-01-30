//show today's date and time
const dateTime=document.getElementById("date");
const today=new Date();
const format= {weekday:"long", month:"short", day:"numeric"};
dateTime.innerHTML=today.toLocaleDateString("en-US",format);

//add to-do function
const list=document.getElementById("list");
const input=document.getElementById("input");
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";

//variables to store tasks
let LIST=[],id=0;

function addTodo(toDo,id,done,trash){
    if(trash){return;}
    const Done= done? CHECK : UNCHECK;
    const Line=done ? LINE_THROUGH : "";
    const item=`<li class="item">
        <i class="fa ${Done} co" job="complete" id="${id}"></i>
        <p class="text ${Line}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>`;
    const pos="beforeend";
    list.insertAdjacentHTML(pos,item);
}
// add item
document.addEventListener("keyup",function(event){
    if(event.key==='Enter'){
        const toDo=input.value;
        if(toDo){
            addTodo(toDo, id , false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
            
            //localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value="";
    }
});

//complete todo
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id]=LIST[element.id].done? false : true;
}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
}
list.addEventListener("click",function(event){
    const element=event.target;
    const elementJob=element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);}
    else if(elementJob=="delete"){
        removeToDo(element);}
    //localStorage.setItem("TODO", JSON.stringify(LIST));
});
