import { Subject, empty, from } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { catchError, switchMap, retry, take, tap } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

const form = document.querySelector('form');
const input = form.querySelector('input[type="text"]');
const countLeft = document.querySelector('#count');
form.addEventListener('submit', formSubmit);

let count = 5;
const form$ = new Subject();

function formSubmit(event) {
    event.preventDefault();

    form$.next(input.value);
}

function sendForm(value) {
    return from(fetch('/form', {
        method: 'POST',
        body: value
    }));
}

const postRequest$ = form$.pipe(
    switchMap(value => {
        return sendForm(value).pipe(
            tap(response => {
                if (response.status >= 400) 
                    throw new Error('Error: ' + response.status)
            }),
            retry(3),
            catchError(_ => empty())
        );
    }),
    tap(_ => countLeft.querySelector('span').textContent= --count),
    take(count)
);


(async () => {
    await postRequest$.toPromise();
    countLeft.textContent = "You ran out of tries";
})();

