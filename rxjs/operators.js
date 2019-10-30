import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
 
const clock$ = Observable.create((subject) => {
    console.log('In Observable');
    const interval = setInterval(() => {
        subject.next('tick');
    }, 1000);
    setTimeout(() => clearInterval(interval), 7 * 1000);
 });
 const subscription = clock$.pipe(
    map((val, index) => index % 2 === 0 ? val : 'tock')
 ).subscribe(val => console.log(val));
  
 setTimeout(() => subscription.unsubscribe(), 10 * 1000);