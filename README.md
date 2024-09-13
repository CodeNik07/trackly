# Trackly

Trackly is a task management application built using the MERN stack. Inspired by Trello, Trackly allows users to create an account and manage their daily tasks efficiently, helping them stay organized and productive.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)

## Features

- **User Authentication**: Secure login and registration for individual accounts.
- **Task Management**: Create, update, delete, and manage tasks across different boards.

## Installation

To get started with Trackly, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/CodeNik07/trackly.git
    cd trackly
    ```

2. **Install dependencies** for both frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Environment Variables**: Create a `.env` file in the root directory of the server and add the following:
    ```env
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```bash
    # Start the backend server
    cd server
    npm start

    # Start the frontend client
    cd ../client
    npm start
    ```

5. **Access the app**:
   Open your browser and go to `http://localhost:3000` to start using Trackly.

## Usage

1. **Sign Up**: Create a new account or log in with existing credentials.
2. **Create Boards**: Set up boards to categorize your tasks.
3. **Add Tasks**: Create tasks within your boards and start organizing.
4. **Manage Workflow**: You can click on add task button to create tasks and on delete button to delete tasks.

## Technology Stack

- **Frontend** :
[![My Skills](https://skillicons.dev/icons?i=html,css,js,react,redux,bootstrap,sass)](https://skillicons.dev)

- **Backend** :
[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mongo)](https://skillicons.dev)

- **Tools** :
[![My Skills](https://skillicons.dev/icons?i=git,github,vscode,postman)](https://skillicons.dev)


