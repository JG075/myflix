var expect = require('chai').expect,
    mongoose = require('mongoose'),
    testHelpers = require('../testHelpers'),
    Movie = require('../../app/models/movie');

process.env.NODE_ENV = 'test';

describe('Movie', function() {

  describe('Validation Testing', function() {
    it('should not accept empty required fields', function(done){
      var movie = new Movie();

      movie.validate(function(err) {
        expect(err.errors.title).to.exist;
        expect(err.errors.year).to.exist;
        expect(err.errors.released).to.exist;
        expect(err.errors.rated).to.exist;
        expect(err.errors.runtime).to.exist;
        expect(err.errors.genre).to.exist;
        expect(err.errors.director).to.exist;
        expect(err.errors.writer).to.exist;
        expect(err.errors.actors).to.exist;
        expect(err.errors.plot).to.exist;
        expect(err.errors.language).to.exist;
        expect(err.errors.poster).to.exist;
        expect(err.errors['ratings.imdb_rating']).to.exist;
        expect(err.errors.imdb_id).to.exist;
        expect(err.errors.type).to.exist;
        done();
      });
    });

    it('should accept valid entries', function(done){
      var movie = new Movie({
        title: 'Test',
        year: '1983',
        released: '01/02/1983',
        rated: 'PG',
        runtime: '162 mins',
        genre: 'Action',
        director: 'John Doe',
        writer: 'Jane Doe',
        actors: 'Foo, Bar, Baz',
        plot: 'Test',
        language: 'English',
        country: 'United Kingdom',
        poster: 'http://example.com/img.jpg',
        ratings: {
          meta_score: '58',
          imdb_rating: '6.6',
          rotten_tomatoes: '88%',
        },
        imdb_id: '001',
        type: 'Movie',
      });

      movie.validate(function(err) {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('DB Testing', function() {
    var mongoSetup = require('../mongoSetup');

    it('should not save a movie if the same title exists', function(done) {
      var movie = new Movie(testHelpers.formattedMovie);
      movie.save(function(err) {
        var movie2 = new Movie(testHelpers.formattedMovie);
        movie2.save(function(err) {
          expect(err).to.exist;
          done();
        });
      });
    });

    it('should save a movie that has a duplicate title, but a different release date', function(done) {
      var movie = new Movie(testHelpers.formattedMovie);
      movie.save(function(err) {
        testHelpers.formattedMovie.year = '2000';
        var movie2 = new Movie(testHelpers.formattedMovie);
        movie2.save(function(err) {
          expect(err).to.not.exist;
          done();
        });
      });
    });

    it('should update the urls of the documents post save', function(done) {
      var movie = new Movie(testHelpers.formattedMovie);
      movie.save(function(err) {
        Movie.find({title: movie.title}, function(err, movies) {
          expect(movies[0].url).to.eq("toy_story_3");
          done();
        });
      });
    });

    it('should add the year to the url of the newest movie post save', function(done) {
      var movie = new Movie(testHelpers.formattedMovie);
      movie.year = '2012';
      var movie2 = new Movie(testHelpers.formattedMovie);

      movie.save(function(err) {
        movie2.save(function(err) {
          Movie.findById(movie._id, function(err, movie) {
            expect(movie.url).to.eq("toy_story_3_2012");
            done();
          });
        });
      });
    });

  });

});
