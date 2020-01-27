import { RxHR } from '@akanass/rx-http-request';
import { map, flatMap } from 'rxjs/operators';

const BASE_PATH = `https://maciejtreder.github.io/asynchronous-javascript`;

const directors$ = RxHR.get(`${BASE_PATH}/directors/`, {json: true}).pipe(map(response => response.body));

const directorId$ = directors$.pipe(
    map(directors => directors.find(director => director.name === "Quentin Tarantino").id)
);

const directorMovies$ = directorId$.pipe(
    flatMap(id => {
         return RxHR.get(`${BASE_PATH}/directors/${id}/movies`, {json: true}) 
    }),
    map(resp => resp.body)
 );
directorMovies$.subscribe(console.log);