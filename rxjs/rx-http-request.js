import { RxHR } from '@akanass/rx-http-request';
import { map, flatMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

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

function getAverageScore(movie) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.rating;
    return RxHR.get(`${BASE_PATH}/movies/${movie.id}/reviews`, {json: true}).pipe(
        map(response => response.body.reduce(reducer, 0) / response.body.length),
        map(response => { return {title: movie.title, averageScore: response}; })
    );
} 

const moviesRatings$ = directorMovies$.pipe(
    flatMap(movies => {
        const observables$ = [];
        movies.forEach(movie => observables$.push(getAverageScore(movie)));
        return combineLatest(observables$);
    })
);

moviesRatings$.subscribe(console.log);