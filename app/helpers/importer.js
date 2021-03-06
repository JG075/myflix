var async = require('async'),
    omdbAPI = require('./omdbAPI'),
    Movie = require('../models/movie');

/*
 * Import given movies into the database with properties from APIs.  Arguments:
 *
 *    movies        An array of movie objects, should not be empty
 *
 *    done          A callback invoked when the process is completed. When sucessful
 *                  it is called with (null, results) where results is an array containing
 *                  counts of the collection documents, and failed movies. Else it will pass
 *                  an error as the first argument.
 *
*/
module.exports = function (movies, done) {
  if (movies.constructor !== Array) throw new Error('Expected "movies" to be an array but received "' + movies.toString() + '"');
  if (movies.length === 0) throw new Error('"movies" should not be empty');

  getDocumentCount(function(err, beforeCount) {
    if (err) return done(err, null);
    updateAndSave(movies, function() {
      getDocumentCount(function(err, afterCount) {
        if (err) return done(err, null);
        done(null, {
          beforeCount: beforeCount,
          afterCount: afterCount,
          added: afterCount - beforeCount,
          failedMovies: failedMovies
        });
      });
    });
  });
};

function getDocumentCount(done) {
    Movie.count({}, function(err, count) {
      if (err) {
        return done(err, null);
      }
      return done(null, count);
    });
}

function updateAndSave(movies, done) {
  async.each(movies, function(movie, callback) {
    var myMovie = movie;
    omdbAPI.get(movie.title, movie.year, function(err, updatedMovie) {
      if (err) {
        logFailedMovie(movie.title, err);
        return callback();
      }
      movie = new Movie(formatMovie(updatedMovie));
      movie.save(function(err) {
        if (err) logFailedMovie(movie.title, err);
        return callback();
      });
    });
  }, function (err) {
      return done();
  });
}

function formatMovie(movie) {
  var formattedMovie = {
    title: movie.Title,
    year: movie.Year,
    released: movie.Released,
    rated: movie.Rated,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    writer: movie.Writer,
    actors: movie.Actors,
    plot: movie.Plot,
    language: movie.Language,
    country: movie.Country,
    poster: movie.Poster,
    ratings: {
      meta_score: movie.Metascore,
      imdb_rating: movie.imdbRating,
      rotten_tomatoes: 'N/A'
    },
    imdb_id: movie.imdbID,
    type: movie.Type,
  };
  getRottenTomatoes(movie, formattedMovie);
  return formattedMovie;
}

var failedMovies = [];

function logFailedMovie(title, err) {
  failedMovies.push({title: title, error: err});
}

function getRottenTomatoes(movie, formattedMovie) {
  if (movie.Ratings.length === 0) return;
  movie.Ratings.forEach(function(rating) {
    if (rating.Source == 'Rotten Tomatoes') {
      formattedMovie.ratings.rotten_tomatoes = rating.Value;
    }
  });
}
