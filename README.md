# React Movie Database
This is a movie database website written on the MERN stack. It supports listing, information display, announcement creations, and searching.


# Installation
## .env Variables
The frontend expects a `.env` file in the root folder with the following schema:
```
REACT_APP_OMDB_KEY=cc276c76 (or your own)
REACT_APP_SERVER_ADDR=<API server URL (http://localhost:4000 unless port is overridden or API is not locally hosted)>
```
The server expects a `.env` file in the `backend` folder with the following schema:
```
DB_URL=<MongoDB URI, example is at mongodb+srv://movieDBExample:movieDBExample@cluster0.cjcoh.mongodb.net/moviedb?retryWrites=true&w=majority>
KEY1=<cookie session key>
KEY2=<cookie session key>
ORIGIN_URL=<URL to allow CORS on (frontend url)>
PORT=<port number to run API on, server.js defaults to 4000>
```
## Runing
Run `npm install` in both the `root` and the `backend` folder  
Ensure nodemon is installed to run the server  
Run `npm start` in root folder to run React app  
Run `nodemon server.js` in `backend` folder to start the server  

## Notes
### Valid logins

`Username: sample
Password: Sample123` (Admin account)
`Username: adminExample
Password: adminExample` (Admin account)


`Username: usersample
Password: User123` (Regular user account)

**You can also register new accounts as either a regular user or an admin**