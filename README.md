# Lattice Take Home Exercise


<img width="720" alt="Screen Shot 2019-04-10 at 4 42 58 PM" src="https://user-images.githubusercontent.com/10293475/55921313-1d465b80-5bb1-11e9-866a-c856e3cee0f9.png">

<img width="720" alt="Screen Shot 2019-04-10 at 4 43 09 PM" src="https://user-images.githubusercontent.com/10293475/55921306-14ee2080-5bb1-11e9-853b-409e7a424829.png">


## How to start application
1. Include ***.env*** file to project directory and define api key. ***TMDb_API=XXXXXXXXXXXXXXX***. Get your API key here(https://developers.themoviedb.org/3/getting-started/introduction).
2. Download all dependency - ***npm i***.
3. Bundle React application - ***npm run webpack-watch***
4. Start application - ***npm start*** and go to ***http://localhost:3000***.
5. Run test(./routes/apiRouter-test.js) - ***npm run test***

## Minimum Feature Set

- [x] 1. When first loaded, the user should see a list of the most [popular movies](https://developers.themoviedb.org/3/movies/get-popular-movies) and a search bar.
- [x] 2. A user should be able to [search](https://developers.themoviedb.org/3/search/search-movies) for a movie by title in the search bar, and the matching results should show up in the list of movies.
- [x] 3. A user can click on a [movie](https://developers.themoviedb.org/3/movies) in the list and be taken to a page that displays more details for the movie (title, movie poster, release date, cast, synopsis, etc)


## Technical Requirements
- [x] 1. Using Node.js, create a backend application that accepts requests to power the features above. This app should query the Movie DB API and return the results to the user.
- [x] 2. Compose your UI using React or Vue.
- [x] 3. Please include a README.md with step-by-step instructions for running the app. Be careful to ensure there are not local dependencies that have been overlooked in the readme.

## Extra Points (optional)
- [x] 1. Add more features that you think are cool! Some ideas:
    - Add filtering by genre.
    - Show related movies.
    - Add a page for individual actor details.
    - Include pagination ***(note - themoviedb api returns total number of pages, but has a difficult time fetching movies for  higher number pages. Stick with single and double digit pagination numbers for best experience).***
- [x] 2. Add a caching layer for your requests to the 3rd party API.(***Implemented caching layer in ./routes/apiRouter.js using redis***).
- [x] 3. This not a design exercise, but UX polish that demonstrates your mastery of your frontend tool set is encouraged.
- [x] 4. Add unit testing for your API(***./routes/apiRouter-test.js***).
