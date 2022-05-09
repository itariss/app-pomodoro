// Isso pode ser declarado como constantes, já que não recebem uma nova atribuição
const playButton = document.querySelector('#play')
const pauseButton = document.querySelector('#pause')
const stopButton = document.querySelector('#stop')

// Timer
const minutesOnTimer = document.querySelector('#minutes')
const secondsOnTimer = document.querySelector('#seconds')

// Divide por 60 e se tem os segundos
const workSessionDuration = 1500 // 25min
const breakSessionDuration = 300 // 5min
let timeLeftOnSession = 0
let isTimerRunning = false
let isTimerStopped = false
let currentSchedule = 'Work'
let timer

// Atualiza dos números no relógio
function setUpdatedClockTimers() {
  const secondsLeft = timeLeftOnSession
  const seconds = secondsLeft % 60
  const minutes = parseInt(secondsLeft / 60) % 60

  // Adiciona ZEROS a esquerda
  const addLeadingZeroes = time => (time < 10 ? `0${time}` : time)

  minutesOnTimer.textContent = addLeadingZeroes(minutes)
  secondsOnTimer.textContent = addLeadingZeroes(seconds)
}

function countOneStepDown() {
  if (timeLeftOnSession > 0) {
    timeLeftOnSession--
  } else if (timeLeftOnSession === 0) {
    // Realiza a troca entre a PAUSA e a TAREFA
    if (currentSchedule === 'Work') {
      timeLeftOnSession = breakSessionDuration
      currentSchedule = 'Break'
    } else {
      timeLeftOnSession = workSessionDuration
      currentSchedule = 'Work'
    }
  }
  setUpdatedClockTimers()
}

// Reseta os contadores do TIMER
function stopClockCounting() {
  clearInterval(timer)
  isTimerRunning = false
  timeLeftOnSession = workSessionDuration
  currentSchedule = 'Work'
  setUpdatedClockTimers()
}

// INICIA, PAUSA ou RESETA o timer
function toggleTimer(reset = false) {
  // RESET
  if (reset) {
    stopClockCounting()
    return
  }

  // Recomeça a contagem se estiver PAUSADO
  if (isTimerStopped) {
    setUpdatedClockTimers()
    isTimerStopped = false
  }

  // INICIA uma contagem
  if (isTimerRunning) {
    clearInterval(timer)
    isTimerRunning = false
  } else {
    timer = setInterval(() => {
      countOneStepDown()
      setUpdatedClockTimers()
    }, 1000)
    isTimerRunning = true
  }
}

// Inicia ou remoceça a contagem
playButton.addEventListener('click', function () {
  toggleTimer()
})

// Pausa a contagem
pauseButton.addEventListener('click', function () {
  toggleTimer()
})

// Reseta as configurações do relógio
stopButton.addEventListener('click', function () {
  toggleTimer(true)
})
