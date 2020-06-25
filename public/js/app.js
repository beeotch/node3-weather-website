// console.log('Client side js file is loaded!');

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {

//         if (data.error) {
//             return console.log(data.error)
//         }

//         console.log(data.location)
//         console.log(data.forecastData)
//     })
// })

const weatherForm = document.querySelector('form'); //it will matches the first form
const search = document.querySelector('input'); // it will matches the first input
const messageOne = document.querySelector('#message-1'); //matches the id, if class uses .class
const messageTwo = document.querySelector('#message-2'); //matches the id, if class uses .class
const messageThree = document.querySelector('#message-3'); //matches the id, if class uses .class

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => { //e stands for event    
    e.preventDefault()

    // const location = search.value
    const location = encodeURIComponent(search.value)

    // rendering loading message
    messageOne.textContent = 'Loading..';
    messageTwo.textContent = '';
    messageThree.textContent = '';


    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                return messageOne.textContent = data.error;
                // return console.log(data.error)
            }

            messageOne.textContent = data.location;
            const temp = JSON.stringify(data.forecastData.temp)
            const feelslike = JSON.stringify(data.forecastData.feelslike)
            const descr = JSON.stringify(data.forecastData.descr)
            const uvIndex = JSON.stringify(data.forecastData.uvIndex)
            const uvScale = parseInt(uvIndex);
            let uvText;
            messageTwo.textContent = 'It is ' + temp + ' degree celcius and the weather is ' + descr + '. It feels like ' + feelslike + ' degree celcius';

            // custom logic for UV Scale
            if (uvScale >= 1 && uvScale < 3){
                uvText = "No protection required!"
            } else if (uvScale >= 3 && uvScale < 8) {
                uvText = "Protection is required"
            } else if (uvScale >=8) {
                uvText = "Put on your shade! Extra protection is required!"
            }
            messageThree.textContent = "The UV Index is " + uvIndex + ". " + uvText;
            // console.log(data.location)
            // console.log(data.forecastData)
        })
    })
})