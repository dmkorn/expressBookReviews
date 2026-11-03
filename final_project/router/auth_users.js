const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();


let users = [];


const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    //  @TODO - this code needs to be implemented
    return true;
}


const authenticatedUser = (username,password)=>{ //returns boolean

    //  Task 7b  -  write code to check if username and password match the one we have in records.

    // Filter the users array for the matching username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    // If the combination is found at least once, the user is authentic
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req,res) => {

    //  Task 7a  -  Complete the code for logging in as a registered user.
    const username = req.body.username;
    const password = req.body.password;

    // Check for username and password
    if (!username || !password) {
        return res.status(404).json({ message: "Username and password required for login" });
    }


    // Check if username / password combination has been is in authorized_users
    if (authenticatedUser(username, password)) {
        // If a valid username / password pair is found,  the Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Add accessToken and username to session
        req.session.authorization = {
            accessToken, username
        }

        return res.status(200).json({message: "User has been logged in"});
    } else {
        return res.status(208).json({ message: "Valid username / password combination needed" });
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {


    //Write your code here


    //  Task 8:  Complete the code for adding or modifying a book review
    const username = req.session.authorization['username']


    // Check for username stored in session authorization
    if (!username) {
        return res.status(404).json({ message: "Username in session required for login" });
    }

    //  This needs to be tested
    if(req.method === 'QUERY'){
        const queryData = req.body;
        console.log("Success - this is a query to auth / review / isbn")
        console.log(queryData);
    }
    else{
        console.log("Query data not found");
    }

    //  DMK - this works
    console.log(req.body.query)

    //Write your code here

    return res.status(300).json({message: "Implementation in Progress"});

});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
