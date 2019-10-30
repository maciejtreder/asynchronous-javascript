import {Observable} from 'rxjs';
 
const clock$ = Observable.create((subject) => {
    console.log('In Observable');
    const interval = setInterval(() => {
        subject.next('tick');
    }, 1000);
    setTimeout(() => clearInterval(interval), 7 * 1000);
 });
 const subscription = clock$.subscribe(console.log);
  
 setTimeout(() => subscription.unsubscribe(), 10 * 1000);