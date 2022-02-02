const weatherForm = document.querySelector(`form`)
const search = document.querySelector(`input`)
const messageOne = document.querySelector(`#message-1`)
const messageTwo = document.querySelector(`#message-2`)

weatherForm.addEventListener(`submit`, (e) => {
    e.preventDefault()

    const location = search.value

    // messageOne.classList.add('animate__animated', 'animate__fadeInUp');
    messageOne.textContent = `Loading...`
    messageTwo.textContent = ``

    fetch(`/weather?address=${location}`).then((response) => {
        // messageOne.classList.remove('animate__animated', 'animate__fadeInUp')
        messageOne.classList.add('animate__animated', 'animate__fadeInUp');
        messageTwo.classList.add('animate__animated', 'animate__fadeInUp');
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })

})