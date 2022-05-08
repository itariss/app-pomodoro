var play = document.querySelector("#play");
var pause = document.querySelector("#pause");
var stop = document.querySelector("#stop");
var breakTime = false;

play.addEventListener("click", function () {
    var timerInterval;
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
    play.addEventListener("click", function () {
        timerInterval = clearInterval(timerInterval);
    });
});

pause.addEventListener("click", function () {
    minutes = minutes.textContent;
    seconds = seconds.textContent;
});

stop.addEventListener("click", function () {
    minutes = document.querySelector("#minutes");
    seconds = document.querySelector("#seconds");
    if (breakTime == false) {
        minutes.textContent = 25;
        seconds.textContent = "00";
    } else {
        minutes.textContent = 5;
        seconds.textContent = "00";
    }
});

function workTimer() {
    while (seconds.textContent != 0) {
        seconds.innerHTML--;
        if (seconds.textContent == 0) {
            minutes.textContent--;
            seconds.textContent = 60;
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
            seconds.textContent = 60;
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
