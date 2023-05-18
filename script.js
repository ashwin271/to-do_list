class Task{
    constructor(name,date){
        this.name=name;
        this.date=date;
    }

    function display(){
        alert(this.name+"  "+this.date);
    }
}

const taskArray=[];

function createTask(){
    var taskName=document.getElementById("new-task").value;
    var taskDate=document.getElementById("new-task-date").value;
    taskArray.push(const Task = new Task(taskName,taskDate));
    taskArray[0].display();
}



