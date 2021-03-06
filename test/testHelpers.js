var imdbResponse = {
  Title: 'Toy Story 3',
  Year: '2010',
  Rated: 'G',
  Released: '18 Jun 2010',
  Runtime: '103 min',
  Genre: 'Animation, Adventure, Comedy',
  Director: 'Lee Unkrich',
  Writer: 'John Lasseter (story by), Andrew Stanton (story by), Lee Unkrich (story by), Michael Arndt (screenplay)',
  Actors: 'Tom Hanks, Tim Allen, Joan Cusack, Ned Beatty',
  Plot: 'The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it\'s up to Woody to convince the other toys that they weren\'t abandoned and to return home.',
  Language: 'English, Spanish',
  Country: 'USA',
  Awards: 'Won 2 Oscars. Another 58 wins & 89 nominations.',
  Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_SX300.jpg',
  Ratings:
  [ { Source: 'Internet Movie Database', Value: '8.3/10' },
  { Source: 'Rotten Tomatoes', Value: '99%' },
  { Source: 'Metacritic', Value: '92/100' } ],
  Metascore: '92',
  imdbRating: '8.3',
  imdbVotes: '581,497',
  imdbID: 'tt0435761',
  Type: 'movie',
  DVD: '02 Nov 2010',
  BoxOffice: '$414,984,497.00',
  Production: 'Walt Disney Pictures',
  Website: 'http://www.disney.com/ToyStory',
  Response: 'True'
};
var formattedMovie = {
  title: imdbResponse.Title,
  year: imdbResponse.Year,
  released: imdbResponse.Released,
  rated: imdbResponse.Rated,
  runtime: imdbResponse.Runtime,
  genre: imdbResponse.Genre,
  director: imdbResponse.Director,
  writer: imdbResponse.Writer,
  actors: imdbResponse.Actors,
  plot: imdbResponse.Plot,
  language: imdbResponse.Language,
  country: imdbResponse.Country,
  poster: imdbResponse.Poster,
  ratings: {
    meta_score: imdbResponse.Metascore,
    imdb_rating: imdbResponse.imdbRating,
    rotten_tomatoes: imdbResponse.Ratings[1].Value,
  },
  imdb_id: imdbResponse.imdbID,
  type: imdbResponse.Type,
};

function createImdbReponse(movie) {
  return {
    Title: movie.title,
    Year: movie.year,
    Rated: 'G',
    Released: '18 Jun 2010',
    Runtime: '103 min',
    Genre: 'Animation, Adventure, Comedy',
    Director: 'Lee Unkrich',
    Writer: 'John Lasseter (story by), Andrew Stanton (story by), Lee Unkrich (story by), Michael Arndt (screenplay)',
    Actors: 'Tom Hanks, Tim Allen, Joan Cusack, Ned Beatty',
    Plot: 'The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it\'s up to Woody to convince the other toys that they weren\'t abandoned and to return home.',
    Language: 'English, Spanish',
    Country: 'USA',
    Awards: 'Won 2 Oscars. Another 58 wins & 89 nominations.',
    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_SX300.jpg',
    Ratings:
    [ { Source: 'Internet Movie Database', Value: '8.3/10' },
    { Source: 'Rotten Tomatoes', Value: '99%' },
    { Source: 'Metacritic', Value: '92/100' } ],
    Metascore: '92',
    imdbRating: '8.3',
    imdbVotes: '581,497',
    imdbID: 'tt0435761',
    Type: 'movie',
    DVD: '02 Nov 2010',
    BoxOffice: '$414,984,497.00',
    Production: 'Walt Disney Pictures',
    Website: 'http://www.disney.com/ToyStory',
    Response: 'True'
  };
}
function getRandomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}
module.exports = {
  createImdbReponse: createImdbReponse,
  imdbResponse: imdbResponse,
  formattedMovie: formattedMovie,
  generateMoviesArray: function(times) {
    var response = [];
    for (var i = 0; i < times; i++) {
      var movie = JSON.parse(JSON.stringify(formattedMovie));
      movie.title += i;
      response.push(movie);
    }
    return response;
  }
};
