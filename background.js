let dbMark
let objStoreMark

function initDataMark() {

    const dbName = "marksDB";
    var request = indexedDB.open(dbName, 2);

    request.onerror = function (event) {
        console.log('Erro onErro ')
        console.log(event)
    };

    request.onupgradeneeded = function (event) {
        dbMark = event.target.result;
    };
}

function addDataMark(markData) {

    if (dbMark) {

        objStoreMark = dbMark.createObjectStore("marks", { autoIncrement: true });
        objStoreMark.add(JSON.stringify(markData));
    }
    else {
        console.log('nothing')
    }
}