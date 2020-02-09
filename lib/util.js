const moment = require('moment');

function sleep(time){
	return new Promise(resolve => setTimeout(resolve, time));
}

function _throw (error){
	console.error(error.message);
	console.error(error.stack);
	process.exit(1);
}

function debug(message){
	console.log(new Date().toLocaleString(), message);
}

function print(object){
	console.log(JSON.stringify(object, null, 2));
}

function dd(message){
	console.log(message);
	process.exit();
}

function getDailyTimestamp(){
	return new Date(moment().format("MM/DD/YYYY")).getTime();
}

module.exports = {
	sleep,
	debug,
	print,
	throw: _throw,
	dd,
	getDailyTimestamp
};