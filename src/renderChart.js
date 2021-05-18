import 'chartjs'
let ctx = document.getElementById('myChart');

class config {
    constructor() {
        this.type = 'bar'
        this.data = {
            datasets: [{
                data: [],
                label: '',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };
        this.options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: ''
                },
            },
            animation: {
                duration: 0 // general animation time
            },
        };
        this.sort = function () {
            this.data.datasets[0].data.sort((firstItem, secondItem) => (firstItem.y - secondItem.y));
            this.data.labels = []
        };
        this.changeType = function (type) {
            this.type = type;
        };
        this.setLabel = function (label) {
            this.data.datasets[0].label = label;
        };
        this.setTitle = function (title) {
            this.options.plugins.title.text = title;
        }
        this.setType = function (type2) {
            this.type = type2;
        }

    }
}
class newData {
    constructor(label) {
        this.data = [];
        this.label = '';
        this.sortedData = [];
    }
    sort = function () {
        this.sortedData = this.data.sort((firstItem, secondItem) => (firstItem.y - secondItem.y));
    }
}



let datas = [];
let myChart = new Chart(ctx, new config())

let graphs = 0;
let graphPos = 0;
var lines;
var type;
let title;
let timerVar;
let timerOn = false;

document.getElementById('file-selector').onchange = function () {
    console.log(this.files[0])
    var reader = new FileReader();
    var file = this.files[0];
    reader.onload = function (progressEvent) {
        lines = this.result.split('\n');
        enableButtons(document.querySelectorAll("#graphStart:disabled"))
    };
    reader.readAsText(file);
};

document.getElementById('graphStart').onclick = function () {
    if (checkBoxes(document.querySelectorAll(".chartType:checked")) == false) {
        return;
    }

    enableButtons(document.querySelectorAll("button:disabled"));
    myChart.options.plugins.title.text = document.getElementById('graphTitle').value;
    myChart.config.type = getType();
    createGraphs()
    updateConfigAsNewObject(datas[graphPos])
}

function createGraphs() {
    if(title == null){
        title = lines.shift();
        console.log(title)
    }else{
        lines.shift();
        console.log(title)
    }
    
    lines.shift();
    lines.shift();
    lines.shift();
    while (lines.length != 0) {
        var groupNum = lines.shift();
        var group = lines.splice(0, groupNum);
        readLines(group)
        lines.shift();
        graphs++;
    }
}

function readLines(group) {
    var line;
    var tempdata = new newData();

    for (var i = 0; i < group.length; i++) {
        line = group[i].split(',');
        if (type == 'pie') {
            tempdata.data.push(line[3]);
            tempdata.label = line[1] + ", " + line[2];

        } else {
            tempdata.data.push({ x: line[1] + ", " + line[2], y: line[3] })
        }

    }
    tempdata.label = line[0]
    datas.push(tempdata)
}


document.getElementById('sortGraph').onclick = function () {
    if (datas[graphPos].sortedData.length == 0) {
        datas[graphPos].sort();
    }
    myChart.config.data.datasets[0].data = datas[graphPos].sortedData;
    myChart.config.data.labels = [];
    myChart.update('active');

}


function updateConfigAsNewObject(config) {
    myChart.config.data.datasets[0].data = config.data;
    myChart.config.data.labels = []
    myChart.config.data.datasets[0].label = config.label
    myChart.config.options.plugins.title.text = title
    myChart.update('active');
}

document.getElementById('nextGraph').onclick = function () {
    nextGraph()
}

document.getElementById('startAnimation').onclick = function () {
    if (timerOn == false) {
        timerVar = setInterval(nextGraph, 600);
        console.log(document.querySelectorAll('.button-group'))
        disableButtons(document.querySelectorAll('.button-group'))
        timerOn = true;
    } else {
        alert('Animation is already running.')
        return
    }
}

document.getElementById('endAnimation').onclick = function () {
    if(timerOn == true){
        clearInterval(timerVar)
        enableButtons(document.querySelectorAll('.button-group'))
    }else{   
        return
    }
}
function nextGraph() {
    console.log("Graph position: " + graphPos + "Total Graphs: " + graphs);
    graphPos++;
    if (graphPos > graphs - 1) {
        alert('Graph position cannot be higher than ' + graphs);
        graphPos--;
    } else {
        updateConfigAsNewObject(datas[graphPos]);
    }
}
document.getElementById('prevGraph').onclick = function () {
    console.log("Graph position: " + graphPos);
    graphPos--;
    if (graphPos < 0) {
        alert('Graph position cannot be less than 0');
        graphPos = 0;
    } else {
        updateConfigAsNewObject(datas[graphPos]);
    }
}
function getType() {
    var items = document.querySelector('.chartType:checked');
    if (items.value == 'pie') {
        console.log(items)
    }
    return items.value
}

function enableButtons(buttonGroup) {
    for (var i = 0; i < buttonGroup.length; i++) {
        buttonGroup[i].disabled = false;
    }
    console.log(buttonGroup)
}

function disableButtons(buttonGroup) {
    for (var i = 0; i < buttonGroup.length; i++) {
        buttonGroup[i].disabled = true;
    }
}

function checkBoxes(boxes) {
    if (boxes.length > 1) {
        alert("Too many boxes checked");
        return false;
    } else if (boxes.length == 0) {
        alert("No boxes checked!");
        return false;
    }
    return true
}

