const request = require('request');

function calculateAverageScore(reviews, movie, director, checkedSoFar, movies) {
    checkedSoFar.count++;
    aggregatedScore = 0;
    count = 0;
    reviews.forEach(review => {
        aggregatedScore += review.rating;
        count++;
    });
   
    movie.averageRating = aggregatedScore / count;
 
    if (checkedSoFar.count == movies.length) {
        movies.sort((m1, m2) => m2.averageRating - m1.averageRating);
        console.log(`The best movie by ${director} is... ${movies[0].title} !!!`);
    }
}

function getReviews(movies, director) {
    let checkedSoFar = {count: 0};
    movies.forEach(movie => {
        request(`https://maciejtreder.github.io/asynchronous-javascript/movies/${movie.id}/reviews`, {json: true}, (err, res, body) => calculateAverageScore(body, movie, director, checkedSoFar, movies));
    });
}

function findDirector(directors, name) {
    let directorId = directors.find(director => director.name === name).id;
    request(`https://maciejtreder.github.io/asynchronous-javascript/directors/${directorId}/movies`, {json: true}, (err, res, body) => getReviews(body, name));
}
 

request(`https://maciejtreder.github.io/asynchronous-javascript/directors`, {json: true}, (err, res, body) => findDirector(body, 'Quentin Tarantino'));
request(`https://maciejtreder.github.io/asynchronous-javascript/directors`, {json: true}, (err, res, body) => findDirector(body, 'Stanley Kubrick'));
request(`https://maciejtreder.github.io/asynchronous-javascript/directors`, {json: true}, (err, res, body) => findDirector(body, 'James Cameron'));
request(`https://maciejtreder.github.io/asynchronous-javascript/directors`, {json: true}, (err, res, body) => findDirector(body, 'Wes Anderson'));