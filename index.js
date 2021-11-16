// Your code here
function createEmployeeRecord(row) {
	return {
		firstName: row[0],
		familyName: row[1],
		title: row[2],
		payPerHour: row[3],
		timeInEvents:[],
		timeOutEvents:[],
	}
}

function createEmployeeRecords(arr) {
	return arr.map(employee => {
		return createEmployeeRecord(employee);
	})
}

function createTimeInEvent(em, datestamp) {
	const [date, hour] = datestamp.split(" ");        
	em.timeInEvents.push({type: "TimeIn", hour: parseInt(hour, 10), date});
	return em;   
}

function createTimeOutEvent(em, datestamp) {
	const [date, hour] = datestamp.split(" ");        
	em.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour, 10), date});
	return em;   
}

function hoursWorkedOnDate(em, date) {
	let timeIn = em.timeInEvents.filter(e => e.date === date);
	let timeOut = em.timeOutEvents.filter(e => e.date === date);
	return parseInt(timeOut[0].hour - timeIn[0].hour) / 100;
}

function wagesEarnedOnDate(em, date) {
	let hours = hoursWorkedOnDate(em, date);
	return hours * em.payPerHour;
}

function allWagesFor(em) {
	return (em.timeInEvents
		.map(e => wagesEarnedOnDate(em, e.date))
		.reduce((current, next) => current + next));
}

function calculatePayroll(ems) {
	return ems.map(em => allWagesFor(em))
	.reduce((current, next) => current + next);
}

/????/
function findEmployeeByFirstName(srcArray, firstName) {
	srcArray.forEach(emp => {
		if (emp.firstName === firstName) {
			return emp.familyName;
		}
	});
	return srcArray[0];
}