let play = document.querySelector("#play");
let pause = document.querySelector("#pause");
let stop = document.querySelector("#stop");
let breakSection = document.querySelector("#break");
let workSection = document.querySelector("#work");

let breakTime = false;
let timerInterval;

let minutesDisplay = document.querySelector("#minutes");
let secondsDisplay = document.querySelector("#seconds");

let selectTimeSection = document.querySelector("#time-section");

let standardMinutesDisplay = 25;
let breakMinutesDisplay = 5;

let minutes = 25;
let seconds = 60;
let timerRunning = false;

let setup = document.querySelector("#setup");

let alarm = new Audio("/assets/audio/alarm.mp3");
let show = true;

let background = document.querySelector("body");
let nav = document.querySelector(".nav");

window.addEventListener("click", () => {
    alarm.load();
});

setup.addEventListener("click", () => {
    selectTimeSection.style.display = "inline";
    if (!show) {
        selectTimeSection.style.display = "none";
        show = true;
    } else {
        show = false;
    }
});

selectTimeSection.addEventListener("click", () => {
    event.stopPropagation();
    timerRunning = false;
    minutes = 25;
    seconds = 60;
    for (let i = 1; i <= selectTimeSection.length; i++) {
        if (selectTimeSection.selectedIndex === 0) {
            minutes = 25;
            standardMinutesDisplay = minutes;
        } else if (selectTimeSection.selectedIndex === i) {
            minutes += i * 5;
            standardMinutesDisplay = minutes;
        }
    }
    breakTime = false;
    minutesDisplay.innerHTML = minutes;
    secondsDisplay.innerHTML = "00";
    clearInterval(timerInterval);
    toogleBtns(pause, play);
    toogleBtns(workSection, breakSection);
});

play.addEventListener("click", () => {
    toogleBtns(play, pause);
    timerRunning ? true : minutes--;
    timerRunning = true;

    timerInterval = setInterval(playTimer, 1000);
});

pause.addEventListener("click", () => {
    toogleBtns(pause, play);
    clearInterval(timerInterval);
});

stop.addEventListener("click", () => {
    toogleBtns(pause, play);

    standardDisplay();
    timerRunning = false;

    clearInterval(timerInterval);
});

breakSection.addEventListener("click", () => {
    toogleBtns(breakSection, workSection);
    toogleBtns(pause, play);
    breakTime = true;
    standardDisplay();
    clearInterval(timerInterval);
    breakBackground();
});

workSection.addEventListener("click", () => {
    breakTime = false;
    toogleBtns(workSection, breakSection);
    toogleBtns(pause, play);
    standardDisplay();
    clearInterval(timerInterval);
    workBackground();
});

function standardDisplay() {
    timerRunning = false;

    seconds = 60;
    minutes = standardMinutesDisplay;
    secondsDisplay.innerHTML = "00";
    if (!breakTime) {
        minutesDisplay.innerHTML = standardMinutesDisplay;
    } else {
        minutes = breakMinutesDisplay;
        minutesDisplay.innerHTML = "0" + breakMinutesDisplay;
    }
}

function playTimer() {
    if (endSection()) {
        alarm.play();

        return;
    }

    alarm.load();
    secondsDisplay.innerHTML--;
    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }
    secondsDisplay.innerHTML = seconds;

    if (seconds <= 9 && seconds >= 1) {
        secondsDisplay.innerHTML = "0" + seconds;
    }

    if (minutes <= 9 && minutes >= 0) {
        return (minutesDisplay.innerHTML = "0" + minutes);
    }

    breakTime
        ? (minutesDisplay.innerHTML = breakMinutesDisplay)
        : (minutesDisplay.innerHTML = minutes);
}

function endSection() {
    if (minutes < 0) {
        toogleBtns(pause, play);
        clearInterval(timerInterval);
        if (!breakTime) {
            toogleBtns(breakSection, workSection);
            breakBackground();
            breakTime = true;
        } else {
            toogleBtns(workSection, breakSection);
            workBackground();
            breakTime = false;
        }
        standardDisplay();
        return true;
    }
    return false;
}

function toogleBtns(btn1, btn2) {
    btn1.style.display = "none";
    btn2.style.display = "inline";
}

function breakBackground() {
    background.classList.add("break");
    nav.classList.add("nav-break");
}

function workBackground() {
    background.classList.remove("break");
    nav.classList.remove("nav-break");
}
