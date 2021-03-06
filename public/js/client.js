console.log("Client side js file is loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Default behaviour of web is prevented
    let location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    if (location.length !== 0) {
        fetch(`/weather?address=${location}`).then(response => {
            response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error);
                    messageOne.textContent = data.error;
                } else {
                    // console.log(data.forecast);
                    // console.log(data.location);
                    messageOne.textContent = data.forecast;
                    messageTwo.textContent = data.location;
                }
            });
        });
    } else {
        console.log("Please enter a valid address.");
        messageOne.textContent = "Please enter a valid address.";
    }

});