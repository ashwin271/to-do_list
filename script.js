class Task
{
    constructor(name,date,status){
        this.name=name;
        this.date=date;
        this.status=false;
    }

    display(){
        alert(this.name+"  "+this.date);
    }
}

const taskArray=[];

function createTask()
{
    var taskName=document.getElementById("new-task").value;
    var taskDate=document.getElementById("new-task-date").value;
    taskArray.push(new Task(taskName,taskDate));
    buildTable(taskArray); 
}

/* ---------------------------------------------------------- */

function buildTable(data)
{
    var table = document.getElementById('myTable');
    
    var tblBody = "";

    for(var i=0;i<data.length;i++)
    {

        var chk = "";

        if(data[i].status==true)
        {
            chk = "checked";
        }

        var row =  `<tr>
                        <td><div style="width: 100px; word-break: break-all;">${data[i].name}</div></td>
                        <td>${data[i].date}</td>
                        <td class="status-section">
                            <input type="checkbox" onclick="checkAddress(this)" class="chk-box" id="chk-box-${i}" ${chk}>
                            <svg onclick="deleteRow(${i})" class="dlt-ico" id="dlt-ico-${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </td>
                    </tr>`;

        tblBody += row;
    }
    table.innerHTML = tblBody;
}

function deleteRow(i) 
{
    taskArray.splice(i,1);
    buildTable(taskArray);
}

/* ------------------------------------------------------ */

function checkAddress(checkbox)
{
    var i = ((checkbox.parentNode.parentNode.rowIndex)-1);

    if(checkbox.checked)
    {
        taskArray[i].status=true;
    }
    else
    {
        taskArray[i].status=false;
    }
    /* alert("row index : "+checkbox.parentNode.parentNode.rowIndex); */
}



/* var searchInp = document.getElementById('search-input')

searchInp.addEventListener('keyup',function()
{
    console.log("hello");
    var value = $(this).val();
    console.log("value : ", value);
}); */

$('#search-input').on('keyup',function()
{
    var value = $(this).val();
    var data = searchTable(value, taskArray);
    buildTable(data);
})

function searchTable(value, data)
{
    var filteredData = [];

    for( var i=0; i<data.length; i++)
    {
        value = value.toLowerCase();
        var name = data[i].name.toLowerCase();
    

        if (name.startsWith(value)) 
        {
            filteredData.push(data[i]);   
        }
    }

    return filteredData;
}

/* ----------------------------------------------------------- */


$('#filter').on('change',function()
{
    /* console.log('changed') */

    var e = document.getElementById('filter');

    var value = e.value;

    var data = [];

    if(value=="none")
    {
        buildTable(taskArray);
        return;
    }
    else if(value=="done")
    {
        data = filterTable(true, taskArray);
    }
    else
    {
        data = filterTable(false, taskArray);
    }

    buildTable(data);
});

function filterTable(value, data)
{
    var filteredData = [];

    for( var i=0; i<data.length; i++)
    {
        var status = data[i].status;

        if (status == value) 
        {
            filteredData.push(data[i]);   
        }
    }

    return filteredData;
}