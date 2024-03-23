# Sick Fits

This project is a full-stack web application designed to streamline the process of event management. It allows users to create, manage, and discover events in their local area. The frontend is built with React and Material-UI for a responsive, user-friendly interface. The backend is powered by Node.js and Express, with MongoDB serving as the database. This application aims to simplify event planning and enhance social connections through shared experiences.

## Stack

This project uses the following technologies:

### Frontend

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps
* [Material-UI](https://material-ui.com/) - A popular React UI framework

### Backend

* [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [MongoDB](https://www.mongodb.com/) - The database for modern applications

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following tools:

* [Node.js](https://nodejs.org/en/download/)
* [NPM](https://www.npmjs.com/get-npm)
* [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   cd Project-Name
   npm install
   ```

4. Enter your API in config<vscode_annotation details="%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D">.js</vscode_annotation>
   ```JavaScript
   const API_KEY = 'ENTER YOUR API';
   ```
5. Start the server
   ```sh
   npm start
   ```
   Now, open your web browser and navigate to http://localhost:3000 (or whatever port you set), you should see the application running. If MongoDB is set up correctly, you should be able to start interacting with the     application.
For production environments...
