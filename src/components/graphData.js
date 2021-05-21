
export function readFileInput(e) {
    return new Promise(resolve => {
        e.preventDefault();

        var reader = new FileReader();
        var file = e.target.files[0];
        var liness;

        reader.onload = (e) => {
            liness = e.target.result.split('\n');
            console.log(liness)

            resolve(liness);
        };


        reader.readAsText(file);


    })

}
export function createGraphs(lines) {
    var dataSet = []
    lines.shift();
    lines.shift();
    lines.shift();
    lines.shift();
    while (lines.length !== 0) {
        var groupNum = lines.shift();
        var group = lines.splice(0, groupNum);
        readLines(group, dataSet)
        lines.shift();

    }
   return dataSet
}

export function readLines(group, data) {
    var line;
    var temp = {
        data : [],
        label : '',
        sortedData : [],
    }
    for (var i = 0; i < group.length; i++) {
        line = group[i].split(',');
        temp.data.push({ x: line[1] + ", " + line[2], y: line[3] })
    }
    temp.label=line[0]
data.push(temp)
}