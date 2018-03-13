/**
 *   @author Youngs, Wyatt (youngsw@ncmich.edu)
 *   @version 0.0.1
 *   @summary Assignment 3 :: created: 02/05/18
 *
 *   Movie Kiosk:  Write the code to run a kiosk at a movie theater. Program should loop infinitely to allow users to either see average rating of previous user entries, or enter their own review.

 Requirements:

 Should store movie title, current user rating, total rating, and number of ratings
 Should display a list of movies for user to review or option to review a new one
 Should allow user to select a movie to see average rating
 Should allow sorting of highest to lowest rated movies
 *
 */
//section 1
"use strict";
const REF = require('./reflib');
const MINIMUM_STARS = 1;
const MAXIMUM_STARS = 5;

//section 2
let movies = [];
let moviesNames = new Map();
let keepRunning = 1;

const MOVIE_TITLES = ["Despicable Me", "The Last Jedi", "Stand By Me", "Iron Man", "Superman"];

class Movie {
    constructor(name) {
        this.name = name;
        this.ratings = [];
    }

    toString() {
        return this;
    }

    averageRating() {
        if(!this.ratings.length) {
            return 0;
        }
        let totalRating = 0;
        for (let rat of this.ratings) {
            totalRating += rat;
        }
        return totalRating / this.ratings.length;
    }

}

//section 3
function main() {
    loadMovies();
    while (keepRunning) {
        runMenu();
    }
}

//section 4
main();

function loadMovies(){
    for (let title of MOVIE_TITLES) {
        let newMovie = new Movie(title);
        movies.push(newMovie);
        moviesNames.set(title.toUpperCase(), newMovie);
    }
}

function addNewMovie(){
    let newTitle = REF.inputString("Enter movie title:  ");
    if(moviesNames.has(newTitle.toUpperCase())) {
        console.log("ERROR: Movie already exists in system!");
        return;
    }
    let newMovie = new Movie(newTitle);
    movies.push(newMovie);
    moviesNames.set(newTitle.toUpperCase(), newMovie);
}

function displayRatings(){
    for(let mov of movies) {
        //console.log(`${mov.name}: ${mov.averageRating()}`);
        console.log(mov);
        console.log(`Average: ${mov.averageRating()}`);
    }
}

function addNewRating(){
    let movieName = REF.inputString("Enter title: ");
    if(!moviesNames.has(movieName.toUpperCase())) {
        console.log("ERROR: Movie not found! ");
        return;
    }
    let movie = moviesNames.get(movieName.toUpperCase());
    let rating = REF.inputNumber(`Number of Stars (${MINIMUM_STARS} - ${MAXIMUM_STARS}): `);
    if(rating > MAXIMUM_STARS || rating < MINIMUM_STARS) {
        console.log("Must enter within range!");
        return;
    }
    movie.ratings.push(rating);
    sortMovies();

}

function bubbleSort(a, b) {
    return b.averageRating() - a.averageRating();
}

function sortMovies() {
    movies.sort(bubbleSort);
}

function runMenu(){
    console.log("1. Add new movie");
    console.log("2. Display user ratings");
    console.log("3. Add new rating");
    console.log("4. Movie Look-Up");
    console.log("5. Logout and Quit");


    switch(REF.inputPosNumber("Enter choice number:   ")) {
        case 1:
            addNewMovie();
            break;
        case 2:
            displayRatings();
            break;
        case 3:
            addNewRating();
            break;
        case 4:
            //doInquire();
            break;
        case 5:
            keepRunning = 0;
            break;
        default:
            console.log("Invalid choice!");
            break;
    }
}

