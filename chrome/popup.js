function act(elements, callback) {
  ;[].slice.call(elements).forEach(callback)
}

function hideSteps() {
  act(document.getElementsByClassName('step'), (step) => {
    step.style.display = 'none'
  })
}

function buttonClick(event) {
  hideSteps()

  const opt = event.target.value

  document.querySelector('.step-2').style.display = 'block'
  document.querySelector(`.opt-${opt}`).style.display = 'block'

  listen()
}

function listen() {
  setTimeout(() => {
    hideSteps()

    document.querySelector('.step-3').style.display = 'block'
  }, 1000 * 10);
}

document.addEventListener('DOMContentLoaded', () => {
  act(document.getElementsByTagName('button'), (button) => {
    button.addEventListener('click', buttonClick)
  })
})
