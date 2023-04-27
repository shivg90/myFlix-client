# myFlix

This is the client-side repository that works with the existing [server-side code](https://github.com/shivg90/myflix-app) for the myFlix application.

This application renders the interface used to request and receive responses from the server-side.
I have used the React Library to display several interface views that will handle the data through the (previously defined) REST API endpoints.

Together with the server-side, the **MERN STACK** has been adopted for this project (MongoDB, Express, React, and Node.js); a full-stack javascript technology.

## Deployment

You can view the deployed app on [Netlify](https://shivg90-myflix-movie-app.netlify.app/login)

## Features

### Main View
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

### Single Movie View
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

### Login View
- Allows users to log in with a username and password

### Signup View
- Allows new users to register (username, password, email, date of birth)

### Profile View
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister


## 🚀 Tech Stack
- React
- JSX
- Bootstrap
- Parcel as the build tool

## Local Environment

- npm install -g parcel
- npm install -save react react-dom
- create a src folder in your project directory with three files: index.jsx, index.scss, index.html
- run parcel src/index.html in terminal to begin parcel build
- see package.json for additional dependencies


