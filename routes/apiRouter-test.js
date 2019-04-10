const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

const server = require('../server');
const apiRouter = require('./apiRouter');
const redisClient = require('./redis-client');

chai.use(chaiHttp);

describe('apiRouter', () => {

  describe('/GET - /api/movies/popular/:pageNumber', () => {
    let page = 3;
    let status_code;
    let currentPage;
    let popularMovies;
    let initialResponseTimeInSeconds;

    before((done) => {
      redisClient.flushall((error, succeeded) => {
        if (error) throw error;
        console.log('Successfully removed cache'); 
      });
      chai.request(server)
          .get(`/api/movies/popular/${page}`)
          .end((err, response) => {
            const { statusCode, headers } = response;
            const { page, results } = response.body;
            status_code = statusCode;
            currentPage = page;
            popularMovies = results;
            initialResponseTimeInSeconds = headers['x-response-time'];
            done();
          });
      });

    it('Should successfully fetch popular movies.', (done) => {
      expect(status_code).to.equal(200);
      done();
    });

    it('Should display all movies on page 3.', (done) => {
      expect(currentPage).to.equal(3);
      done();
    });

    it('Subsequent fetch should be faster due to caching.', (done) => {
      let currentResponseTimeInSeconds;
      chai.request(server)
          .get(`/api/movies/popular/${3}`)
          .end((error, response) => {
            currentResponseTimeInSeconds = response.headers['x-response-time'];
            currentResponseTimeInSeconds = parseFloat(currentResponseTimeInSeconds.match(/(\d+)(\.\d+)?/g)[0]);
            initialResponseTimeInSeconds = parseFloat(initialResponseTimeInSeconds.match(/(\d+)(\.\d+)?/g)[0]);
            let = aMillisecond = 1000;
            expect(currentResponseTimeInSeconds).to.be.lessThan(initialResponseTimeInSeconds);
            expect(currentResponseTimeInSeconds*1000).to.be.lessThan(aMillisecond);
            done();
          });
    });
  });

  describe('/GET - /api/movies/search/', () => {
    let page = 1;
    let status_code;
    let currentPage;
    let popularMovies;
    let initialResponseTimeInSeconds;

    before((done) => {
      redisClient.flushall((error, succeeded) => {
        if (error) throw error;
        console.log('Successfully removed cache: ', succeeded); 
      });
      chai.request(server)
          .get(`/api/movies/search/`)
          .query({search: 'pokemon', page: 1})
          .end((err, response) => {
            const { statusCode, headers } = response;
            const { page, results } = response.body;
            status_code = statusCode;
            currentPage = page;
            popularMovies = results;
            initialResponseTimeInSeconds = headers['x-response-time'];
            done();
          });
      });

    it('Should successfully fetch movies based on search query.', (done) => {
      expect(status_code).to.equal(200);
      done();
    });

    it('Should display all movies on page 1.', (done) => {
      expect(currentPage).to.equal(1);
      done();
    });

    it('Subsequent fetch should be faster due to caching.', (done) => {
      let currentResponseTimeInSeconds;
      chai.request(server)
          .get(`/api/movies/search/`)
          .query({search: 'pokemon', page: 1})
          .end((error, response) => {
            currentResponseTimeInSeconds = response.headers['x-response-time'];
            currentResponseTimeInSeconds = parseFloat(currentResponseTimeInSeconds.match(/(\d+)(\.\d+)?/g)[0]);
            initialResponseTimeInSeconds = parseFloat(initialResponseTimeInSeconds.match(/(\d+)(\.\d+)?/g)[0]);
            let = aMillisecond = 1000;
            expect(currentResponseTimeInSeconds).to.be.lessThan(initialResponseTimeInSeconds);
            expect(currentResponseTimeInSeconds*1000).to.be.lessThan(aMillisecond);
            done();
          });
    });
  });

  describe('/GET - /api/movie/:movieId', () => {
    let movieId = 299536;
    let status_code;
    let movieData;
    let initialResponseTimeInSeconds;
    
    before((done) => {
      redisClient.flushall((error, succeeded) => {
        if (error) throw error;
        console.log('Successfully removed cache: ', succeeded); 
      });
      chai.request(server)
          .get(`/api/movie/${movieId}`)
          .end((err, response) => {
            const { statusCode, headers } = response;
            status_code = statusCode;
            movieData = response.body;
            initialResponseTimeInSeconds = headers['x-response-time'];
            done();
          });
      });

    it('Should successfully fetch selected movie by id.', (done) => {
      expect(status_code).to.equal(200);
      done();
    });

    it('Should have properties relating to the selected movie.', (done) => {
      const expectedProperties = [
        'adult',
        'backdrop_path',
        'belongs_to_collection',
        'budget',
        'genres',
        'homepage',
        'id',
        'imdb_id',
        'original_language',
        'original_title',
        'overview',
        'popularity',
        'poster_path',
        'production_companies',
        'production_countries',
        'release_date',
        'revenue',
        'runtime',
        'spoken_languages',
        'status',
        'tagline',
        'title',
        'video',
        'vote_average',
        'vote_count',
        'results'
      ];

      let movieProperties = Object.keys(movieData);
      for (let property of expectedProperties) {
        expect(movieProperties.indexOf(property)).to.be.greaterThan(-1);
      }
      done();
    });

    it('Should have expected video meta properties if video datas exist', (done) => {
      let hasVideoData = movieData.length > 0;
      let expectedProperties = [
        'id',
        'iso_639_1',
        'iso_3166_1',
        'key',
        'name',
        'site',
        'size',
        'type'
      ];
      if (hasVideoData) {
        expect(movieProperties.indexOf(property)).to.be.greaterThan(-1);
      }
      done();
    });

    it('Subsequent fetch should be faster due to caching.', (done) => {
      let currentResponseTimeInSeconds;
      chai.request(server)
          .get(`/api/movie/${movieId}`)
          .end((error, response) => {
            currentResponseTimeInSeconds = response.headers['x-response-time'];
            currentResponseTimeInSeconds = parseFloat(currentResponseTimeInSeconds.match(/(\d+)(\.\d+)?/g)[0]);
            initialResponseTimeInSeconds = parseFloat(initialResponseTimeInSeconds.match(/(\d+)(\.\d+)?/g)[0]);
            let = aMillisecond = 1000;
            expect(currentResponseTimeInSeconds).to.be.lessThan(initialResponseTimeInSeconds);
            expect(currentResponseTimeInSeconds*1000).to.be.lessThan(aMillisecond);
            done();
          });
    });
  });

});
