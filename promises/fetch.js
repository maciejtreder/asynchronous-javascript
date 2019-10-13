const ora = require('ora');
const spinner = ora('The best movie by Quentin Tarantino is...').start();
const fetch = require('node-fetch');

fetch(`https://maciejtreder.github.io/asynchronous-javascript/directors/`)
.then(response => response.json())
.then(directors => {
  let tarantinoId = directors.find(director => director.name === "Quentin Tarantino").id;
  return fetch(`https://maciejtreder.github.io/asynchronous-javascript/directors/${tarantinoId}/movies`);
})
.then(response => response.json())
.then(movies => {
    let reviewsArr = [];
    movies.forEach(movie => {
        reviewsArr.push(
            fetch(`https://maciejtreder.github.io/asynchronous-javascript/movies/${movie.id}/reviews`)
            .then(response => response.json()).then(reviews => {
                return {movie: movie, reviews: reviews};
            })
        );
    });
    return Promise.all(reviewsArr);
}) 
.then(reviewSets => {
    let moviesAndRatings = [];
    reviewSets.forEach(reviews => {
        let aggregatedScore = 0;
        reviews.reviews.forEach( review => aggregatedScore += review.rating );
        let averageScore = aggregatedScore / reviews.reviews.length;
 
        moviesAndRatings.push({title: reviews.movie, averageScore: averageScore});
    });
    return moviesAndRatings.sort((m1, m2) => m2.averageScore - m1.averageScore)[0].title;
})
.then(movie => spinner.succeed(` ${movie.title} !`))
.catch(error => spinner.fail(error));
