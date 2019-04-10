# Lattice Take Home Exercise

![alt text](https://ibb.co/pdQQs5d)
![alt text](https://ibb.co/ScDjHHz)

## How to start application
1. Include ***.env*** file to project directory and define api key. ***TMDb_API=XXXXXXXXXXXXXXX***. Get your API key here(https://developers.themoviedb.org/3/getting-started/introduction).
2. Download all dependency - ***npm i***.
3. Bundle React application - ***npm run webpack-watch***
4. Start application - ***npm start*** and go to ***http://localhost:3000***.
5. Run test(./routes/apiRouter-test.js) - ***npm run test***


## Technical Requirements
- [x] 1. Using Node.js, create a backend application that accepts requests to power the features above. This app should query the Movie DB API and return the results to the user.
- [x] 2. Compose your UI using React or Vue.
- [x] 3. Please include a README.md with step-by-step instructions for running the app. Be careful to ensure there are not local dependencies that have been overlooked in the readme.

## Extra Points (optional)
- [x] 1. Add more features that you think are cool! Some ideas:
    - Add filtering by genre.
    - Show related movies.
    - Add a page for individual actor details.
    - ** Include pagination (note - themoviedb api returns total number of pages, but has a difficult time fetching movies for  higher number pages. Stick with single and double digit pagination numbers. ) **
- [x] 2. Add a caching layer for your requests to the 3rd party API.(I have implemented caching layer in ./routes/apiRouter.js using redis).
- [x] 3. This not a design exercise, but UX polish that demonstrates your mastery of your frontend tool set is encouraged.
- [x] 4. Add unit testing for your API(./routes/apiRouter-test.js).