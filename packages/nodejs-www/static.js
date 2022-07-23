let fs = require("fs");
let url = require("url");

const readFile = (path) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                resolve({
                    success: false,
                    data: null
                });
                return;
            }

            resolve({
                success: true,
                data: data
            });
        });
    });
}

exports.readStatic = async function (path) {
    let result = await readFile(path);
    return result.success ? result.data : null;
}