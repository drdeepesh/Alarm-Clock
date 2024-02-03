let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

const time = document.getElementById('time');
const timeFormat = document.getElementById('format');

let selectData = document.querySelectorAll('select');
let setAlarm = document.querySelector('.set-alarm');
let alarmListContainer = document.querySelector('.alarm-list-container');

// audio for the alarm
let ringtone = new Audio('sound.mp3');

// creating array for alarms
let alarms = [];

function clockTime(){
    // this date is Common for Digital & Analog clock both
    let date = new Date();

    // for analog clock
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    // calculation for the clock hands rotation
    let hRotate = 30*hh + mm/2;
    let mRotate = 6*mm;
    let sRotate = 6*ss;

    // applying rotation on the clock hands in degrees
    hr.style.transform = `rotate(${hRotate}deg)`;
    min.style.transform = `rotate(${mRotate}deg)`;
    sec.style.transform = `rotate(${sRotate}deg)`;

    // for digital clock
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let ampm = hrs>12 ? "PM" : "AM";

    // conver the clock time from 24H format to 12H
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;

    hrs = hrs<10 ? `0${hrs}` : hrs;
    mins = mins<10 ? `0${mins}` : mins;
    secs = secs<10 ? `0${secs}` : secs;

    // to show the timing on digital clock
    time.innerHTML = `${hrs}:${mins}:${secs}`;
    timeFormat.innerHTML = ampm;

    // Check if any alarm should ring
    alarms.forEach(alarm => {
        if (alarm.time === `${hrs}:${mins} ${ampm}`) {
            ringtone.play();
        }
    });


}

// function to update time after every 1 sec
setInterval(clockTime, 1000);

// alarms
for(let i = 12; i>=1; i--){
    if(i <= 9){
        i = `0${i}`;
    }else{
        i = i;
    }
    let option = `<option value = "${i}">${i}</option>`;
    selectData[0].firstElementChild.insertAdjacentHTML('afterend', option);
}

for(let i = 59; i>=0; i--){
    if(i <= 9){
        i = `0${i}`;
    }else{
        i = i;
    }
    let option = `<option value = "${i}">${i}</option>`;
    selectData[1].firstElementChild.insertAdjacentHTML('afterend', option);
}

for(let i = 0; i<2; i++){
    let ampm;
    if(i==1){
        ampm = 'AM';
    }else{
        ampm = 'PM';
    }
    let option = `<option value = "${ampm}">${ampm}</option>`;
    selectData[2].firstElementChild.insertAdjacentHTML('afterend', option);
}


// Function to add alarms to the list
function addAlarmToList(time) {
    let listItem = document.createElement('div');
    listItem.textContent = time;
    listItem.classList.add('alarm-list-item');

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    
    deleteButton.addEventListener('click', function () {
        // Pause the Alarm Sound
        ringtone.pause();
        // Remove the alarm from the list
        alarmListContainer.removeChild(listItem);
        // Remove the alarm from the alarms array
        alarms = alarms.filter(alarm => alarm.time !== time);
    });
    listItem.appendChild(deleteButton);
    alarmListContainer.appendChild(listItem);
}

setAlarm.addEventListener('click', () => {
    let time = `${selectData[0].value}:${selectData[1].value} ${selectData[2].value}`;

    // Check if the alarm is valid
    if (time.includes("hour") || time.includes("minute") || time.includes("ampm")) {
        return alert("Please Select a valid time to set alarm");
    }

    // Check if the alarm is already set
    if (alarms.find(alarm => alarm.time === time)) {
        return alert("Alarm already set for this time");
    }

    // Add the alarm to the list of alarms
    alarms.push({ time: time });

    // Add the alarm to the alarm list
    addAlarmToList(time);
});

