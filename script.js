var play = document.querySelector("#play");
var pause = document.querySelector("#pause");
var stop = document.querySelector("#stop");
var breakTime = false;
var timerInterval;
minutes = document.querySelector("#minutes").textContent;
seconds = document.querySelector("#seconds").textContent;

play.addEventListener("click", function () {
    toogleBtns(play, pause);

    timerInterval = clearInterval(timerInterval);
    playTimer();
});

pause.addEventListener("click", function () {
    toogleBtns(pause, play);

    clearInterval(timerInterval);
});

stop.addEventListener("click", function () {
    toogleBtns(pause, play);

    if (breakTime == false) {
        minutes.textContent = 25;
        seconds.textContent = "00";
    } else {
        minutes.textContent = 5;
        seconds.textContent = "00";
    }
    return minutes && seconds;
});

function workTimer() {
    while (seconds.textContent != 0) {
        seconds.innerHTML--;
        if (seconds.textContent == 0) {
            minutes.textContent--;
            seconds.textContent = 59;
            if (minutes.textContent < 0) {
                minutes.textContent = 5;
                seconds.textContent = "00";
                breakTime = true;
                clearInterval(timerInterval);

                return seconds.textContent && minutes.textContent;
            }
            return seconds.textContent && minutes.textContent;
        }
        if (seconds.textContent <= 9) {
            return (seconds.innerHTML = "0" + seconds.textContent);
        }
        return seconds.textContent;
    }
}

function breakTimer() {
    while (seconds.textContent != 0) {
        seconds.textContent--;
        if (seconds.textContent == 0) {
            minutes.textContent--;
            seconds.textContent = 59;
            if (minutes.textContent < 0) {
                minutes.textContent = 25;
                seconds.textContent = "00";
                breakTime = false;
                clearInterval(timerInterval);

                return seconds.textContent && minutes.textContent;
            }
            return seconds.textContent && minutes.textContent;
        }
        if (seconds.textContent <= 9) {
            return (seconds.innerHTML = "0" + seconds.textContent);
        }
        return seconds.textContent;
    }
}

function playTimer() {
    minutes = document.querySelector("#minutes");
    seconds = document.querySelector("#seconds");

    if (breakTime == false) {
        timerInterval = setInterval(workTimer, 1000);
    } else {
        timerInterval = setInterval(breakTimer, 1000);
    }

    if (minutes.textContent == 25 && seconds.textContent == "00") {
        minutes.textContent = 24;
        seconds.textContent = 59;
    }
    if (breakTime && seconds.textContent == "00") {
        minutes.textContent = 4;
        seconds.textContent = 59;
    }

    if (minutes.textContent == 0 && seconds.textContent == "00") {
        timerInterval = clearInterval(timerInterval);
    }
    return minutes && seconds;
}

function toogleBtns(btn1, btn2) {
    btn1.style.display = "none";
    btn2.style.display = "inline";
}

function timer() {}
