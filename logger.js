const fs = require("fs");

const infoStream = fs.createWriteStream("logs/info.txt");
const errorStream = fs.createWriteStream("logs/error.txt");
const debugStream = fs.createWriteStream("logs/debug.txt");
const warningStream = fs.createWriteStream("logs/warning.txt");

Logger = { };
Logger.info = (msg) => {
    const message = formatDate() + " : " + msg + "\n";
    infoStream.write(message);
};

Logger.debug = (msg) => {
    const message = formatDate() + " : " + msg + "\n";
    debugStream.write(message);
};

Logger.error = (msg) => {
    const message = formatDate() + " : " + msg + "\n";
    errorStream.write(message);
};

Logger.warning = (msg) => {
    const message = formatDate() + " : " + msg + "\n";
    warningStream.write(message);
};

function formatDate() {
    let date = new Date();
    let formatted_date = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formatted_date;
}

module.exports = Logger;
