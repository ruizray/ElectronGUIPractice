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