import { RxHR } from '@akanass/rx-http-request';
import { map, flatMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import ora from 'ora';

const spinner = ora().start(`The best movie by Quentin Tarantino is...`);

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

const best$ = moviesRatings$.pipe(map(movies => movies.sort((m1, m2) => m2.averageScore - m1.averageScore)[0].title));

best$
.pipe(tap(_ => spinner.stop())) //this has been added
.subscribe(result => console.log(`The best movie by Quentin Tarantino is... ${result}!`));