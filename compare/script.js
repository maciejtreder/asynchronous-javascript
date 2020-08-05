
const input = form.querySelector('input[type="text"]');
const countLeft = document.querySelector('#count span');
const form = document.querySelector('form');

form.addEventListener('submit', formSubmit);

let count = 5;

function formSubmit(event) {
    event.preventDefault();
    console.log('Form submitted');

    if (count == 0)
        return;

    sendForm();
}

function sendForm() {
    const response = fetch('/form', {
        method: 'POST',
        body: input.value
    });

    response.then(response => {
        if (response.status == 200) {
            count--;
        }
        countLeft.textContent = count;
    });
}

