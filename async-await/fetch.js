import fetch from 'node-fetch';
import ora from 'ora';

const directorToCheck = 'Quentin Tarantino';
const spinner = ora('The best movie by ' + directorToCheck + ' is...').start();
(async () => {
   try {
       const directors = await fetch('https://maciejtreder.github.io/asynchronous-javascript/directors').then(response => response.json());
       const directorId = directors.find(director => director.name === directorToCheck).id;

       const movies = await fetch('https://maciejtreder.github.io/asynchronous-javascript/directors/' + directorId + '/movies').then(response => response.json());

       let reviewPromises = [];
       movies.forEach(movie => {
           reviewPromises.push(
               fetch('https://maciejtreder.github.io/asynchronous-javascript/movies/'+ movie.id +'/reviews')
               .then(response => response.json())
               .then(reviews => { return {title: movie.title, reviews: reviews}})
           );
       });

       let moviesRating = [];
  
       for await (let reviewsSet of reviewPromises) {
           let aggregatedScore = 0;
           reviewsSet.reviews.forEach(review => aggregatedScore += review.rating);
           let averageScore = aggregatedScore / reviewsSet.reviews.length;
           moviesRating.push({title: reviewsSet.title, score: averageScore});
       }
  
       const best = moviesRating.sort((movie1, movie2) => movie2.score - movie1.score)[0].title;
      
       spinner.succeed(best + "!");

   } catch(error) {
       spinner.fail(error);
   }
})();