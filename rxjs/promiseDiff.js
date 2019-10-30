import {Observable} from 'rxjs';
 
const myPromise = new Promise(resolve => {
    console.log('Inside promise');
    setTimeout(() => resolve('Promise resolves'), 1000);
});
 
const myObservable = Observable.create(subject => {
    console.log('Inside observable');
    setTimeout(() => {subject.next('Observable emits'); subject.complete();}, 1000);
});

myPromise.then(console.log);
myObservable.subscribe(console.log);